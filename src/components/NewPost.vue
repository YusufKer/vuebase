<template>
    <form @submit.prevent="handleSubmit" class="grid gap-4 max-w-[500px]">
        <img class="max-w-full" :src="imageSrc" alt="">
        <input @change="handleImageChange" type="file">
        <textarea class="p-4" v-model="textInput" name="" id="" cols="30" rows="10"></textarea>
        <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Post</button>
        <p class="bg-red-100">{{ errorText }}</p>
    </form>
</template>

<script setup>
    /*
        TODO:
        [x] display image before upload
        [x] upload image to firebase storage
        [x] get imageUrl of uploaded image
        [ ] build object:
            {
                date: firebase date,
                text_content: string,
                image_url: string,
                comments: [ comment_id ]
            }
        [ ] error responses to be mapped to error messages
    
    */ 
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { collection, addDoc, Timestamp } from "firebase/firestore";
    import { db } from "../firebase.js";

    const storage = getStorage();
    const store = useStore();

    const currentUser = store.state.user;

    const imageSrc = ref("");
    const textInput = ref("");
    const tempFile = ref(null);
    const imageUrl = ref("");
    const errorText = ref("");

    function handleImageChange(e){
        if(!e.target.files) return;
        tempFile.value = e.target.files[0];
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
        const storageRef = firebaseRef(storage, `posts/${currentUser.uid}/${tempFile.value.name}`);
        try{
            await uploadBytes(storageRef, tempFile.value);
            const url = await getDownloadURL(storageRef);
            imageUrl.value = url;
            console.log({downloadUrl:url})
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
            // CHECK THAT POST IS NOT AN EMPTY OBJECT
            if(Object.keys(post).length === 0){
                throw {message:"Post empty"};
            }
            const docRef = await addDoc(collection(db, "posts"), {
                ...post,
                date: Timestamp.fromDate(new Date()),
                userUid:currentUser.uid,
                comments: []
            });
            console.log("Document written with ID: ", docRef.id);
        }catch(error){
            console.log(error)
        }finally{
            store.dispatch("hideLoader");
        }
    }
</script>