<template>
    <div class="p-4 grid grid-cols-2 gap-6">
        <div class="grid gap-6">
            <form @submit.prevent="updateUserInfo" class="grid gap-4">
                <p class="text-2xl">Update Info:</p>
                <div class="grid gap-4">
                    <label for="display-name">Display name:</label>
                    <input v-model="displayNameInput" id="display-name" type="text">
                </div>
                <div class="grid gap-4">
                    <label for="phone-number">Phone number:</label>
                    <input v-model="phoneNumberInput" id="phone-number" type="tel">
                </div>
                <div>
                    <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Update</button>
                </div>
            </form>
            <form @submit.prevent class="grid gap-4">
                <p class="text-2xl">Update Email:</p>
                <div class="grid gap-4">
                    <label for="email">Email:</label>
                    <input v-model="emailInput" id="email" type="email">
                </div>
                <div class="flex gap-4">
                    <button @click="updateUserEmail" class="bg-yellow-50 py-2 px-6 rounded-xl">Update</button>
                    <button @click="verifyEmail" class="bg-yellow-50 py-2 px-6 rounded-xl">Verify email</button>
                </div>
            </form>
        </div>
        <div class="bg-purple-50">
            <p class="text-2xl">Update profile picture:</p>
            <img class="w-full bg-red-50 aspect-square" :src="profileImageSrc" alt="Profile Picture"/>
            <input type="file" @change="handleFileChange">
            <button @click="upload" class="bg-yellow-50 py-2 px-6 rounded-xl">upload</button>
        </div>
    </div>
</template>

<script setup>
    import { getAuth, updateProfile, updateEmail, sendEmailVerification } from "firebase/auth";
    import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { useStore } from "vuex";
    // MOUNTED TO BE REMOVED
    import { ref, onMounted } from 'vue';

    const auth = getAuth();
    const storage = getStorage();
    const store = useStore();

    const displayNameInput = ref("");
    const emailInput = ref("");
    const phoneNumberInput = ref("");
    const profileImageSrc = ref("");
    let tempFile = null;

    // onMounted(()=>{
    //     profileImageSrc.value = store.state.user.photoURL;
    // })

    const userInfo = {}

    async function updateUserInfo(){
        if(displayNameInput.value !== ""){
            userInfo.displayName = displayNameInput.value;
        }
        if(phoneNumberInput.value !== ""){
            userInfo.phoneNumber = phoneNumberInput.value;
        }
        updateProfile(auth.currentUser,userInfo)
            .then(() =>{
                console.log("Profile Updated")
            })
            .catch(error => {
                console.log(error);
            })
    }

    function updateUserEmail(){
        if(emailInput.value === ""){
            console.log("Email empty")
            return;
        }
        updateEmail(auth.currentUser, emailInput.value)
            .then(() =>{
                console.log("Email Updated")
            })
            .catch(error =>{
                console.log(error)
            })
    }

    async function verifyEmail(){
        sendEmailVerification(auth.currentUser)
            .then(() =>{
                console.log("Verification email sent")
            })
            .catch(error =>{
                console.log(error);
            })
    }

    function handleFileChange(e){
        tempFile = e.target.files[0]
        const storageRef = firebaseRef(storage, `user-images/${auth.currentUser.uid}_${e.target.files[0].name}`);
    }

    /*
        [x] add functionality to add file to storage
        [x] add loading function to prevent user from leaving until file is uploaded or fails
        [x] get url to that file
        [x] update the userInfo profile photo url to point to that file
    */

    async function upload(){
        if(!tempFile){
            console.log("No file selected...");
            return;
        }
        store.dispatch("showLoader");
        const storageRef = firebaseRef(storage, `user-images/${auth.currentUser.uid}.${tempFile.name.split(".")[1]}`);
        try{
            await uploadBytes(storageRef, tempFile);
            const url = await getDownloadURL(storageRef);
            await updateProfile(auth.currentUser,{photoURL:url});
            profileImageSrc.value = url;
            console.log("Profile Updated");
            store.dispatch("hideLoader");
        }catch(error){
            console.log(error);
            store.dispatch("hideLoader");
        }
    }
</script>