<template>
    <form @submit.prevent="handleSubmit" class="grid gap-4 max-w-[500px]">
        <img class="max-w-full" :src="imageSrc" alt="">
        <input @change="handleImageChange" type="file">
        <textarea class="p-4" v-model="textInput" name="" id="" cols="30" rows="10"></textarea>
        <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Post</button>
        <p class="bg-red-100">{{ errorText }}</p>
        <p>{{ post }}</p>
        <button @click.prevent="testing">test post</button>
    </form>
</template>

<script setup>

    /*
        TODO:
        [x] display image before upload
        [x] upload image to firebase storage
        [x] get imageUrl of uploaded image
        [ ] build opbject {
                text,
                imageUrl,
                comments
            }
            object to contain:
            {
                date: firebase date,
                text_content: string,
                image_url: string,
                comments: [ comment_id ]
            }
    */ 

    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { getAuth } from 'firebase/auth';
    import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { collection, addDoc } from "firebase/firestore";
    import { db } from "../firebase.js";

    async function testing(){
        console.log(db)
        console.log(collection);
        console.log(addDoc);
        try{
            const docRef = await addDoc(collection(db, "posts"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
            console.log("Works")
        }catch(error){
            console.log(error)
        }
    }

    const storage = getStorage();
    const auth = getAuth();
    const store = useStore();

    const imageSrc = ref("");
    const textInput = ref("");
    const tempFile = ref(null);
    const imageUrl = ref("");
    const errorText = ref("");

    function handleImageChange(e){
        if(!e.target.files) return;
        tempFile.value = e.target.files[0];
        // CHECK THAT FILE READER IS SUPPORTED
        if(FileReader){
            const fr = new FileReader();
            fr.onload = function(){
                imageSrc.value = fr.result;
            }
            fr.readAsDataURL(e.target.files[0]);
            tempFile.value = e.target.files[0];
        }else{
            errorText.value = "File reader not supported on this browser. Please use a different browser."
        }
    }

    async function uploadImage(){
        if(!tempFile.value) return;
        const storageRef = firebaseRef(storage, `posts/${auth.currentUser.uid}/${tempFile.value.name}`);
        try{
            await uploadBytes(storageRef, tempFile);
            const url = await getDownloadURL(storageRef);
            imageUrl.value = url;
        }catch(error){
            console.log(error);
        }
    }

    async function handleSubmit(){
        try{
            const post = {};
            store.dispatch("showLoader");
            await uploadImage();
            if(imageUrl.value !== ""){
                post.imageUrl = imageUrl.value;
                console.log("URL not empty");
            }
            if(textInput.value !== ""){
                post.textContent = textInput.value;
                console.log("text content not empty");
            }
            if(Object.keys(post).length > 0){
                post.comments = [];
            }
            console.table(post)
        }catch(error){
            console.log(error)
        }finally{
            store.dispatch("hideLoader");
        }
    }
</script>