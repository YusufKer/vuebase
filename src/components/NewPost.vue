<template>
    <form @submit.prevent="handleSubmit" class="grid gap-4 max-w-[500px]">
        <img :src="imageSrc" alt="">
        <input @change="handleImageChange" type="file">
        <textarea v-model="textInput" name="" id="" cols="30" rows="10"></textarea>
        <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Post</button>
    </form>
</template>

<script setup>

    /*
        TODO:
        [x] display image before upload
        [ ] upload image to firebase storage
        [ ] get imageUrl of uploaded image
        [ ] upload an object to cloud firestore
            - object to contain:
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

    const storage = getStorage();
    const auth = getAuth();
    const store = useStore();
    
    const imageSrc = ref("");
    const textInput = ref("");
    const tempFile = ref(null);
    const imageUrl = ref("");

    onMounted(()=>{
        console.log(tempFile.value);
    })

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
        }
    }
    async function uploadImage(){
        if(!tempFile){
            console.log("No image Selected...");
            return;
        }
        const storageRef = firebaseRef(storage, `posts/${auth.currentUser.uid}/${tempFile.name}`);
        try{
            await uploadBytes(storageRef, tempFile);
            const url = await getDownloadURL(storageRef);
            imageUrl.value = url;
            console.log("Image uploaded...");
        }catch(error){
            console.log(error);
        }finally{
        }
    }

    async function handleSubmit(){
        try{
            store.dispatch("showLoader");
            await uploadImage();
            const post = {};
            if(!imageUrl.value === ""){
                post.imageUrl = imageUrl.value;
            }
            if(!textInput.value === ""){
                post.textContent === textInput.value;
            }
            console.log(imageUrl.value);
            console.log(textInput.value);
        }catch(error){
            console.log(error)
        }finally{
            store.dispatch("hideLoader");
        }
    }
</script>