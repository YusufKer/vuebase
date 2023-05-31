<template>
    <form @submit.prevent class="grid gap-4 max-w-[500px]">
        <img :src="imageSrc" alt="">
        <input @change="handleImageChange" type="file">
        <textarea name="" id="" cols="30" rows="10"></textarea>
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

    import { ref } from 'vue';
    import { getAuth } from 'firebase/auth';
    import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';

    const storage = getStorage();
    const auth = getAuth();
    
    const imageSrc = ref("");
    const tempFile = ref(null);

    function handleImageChange(e){
        if(!e.target.files) return;
        tempFile.value = e.target.files;
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
        }
        const storageRef = firebaseRef(storage, `posts/${auth.currentUser.uid}/${tempFile.name}`);
    }
</script>