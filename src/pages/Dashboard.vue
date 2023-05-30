<template>
    <div class="p-4 grid grid-cols-2 gap-6">
        <div class="grid gap-6">
            <p class="text-2xl">Update Info:</p>
            <form @submit.prevent="updateUserDisplayName" class="grid gap-4">
                <div class="grid gap-4">
                    <label for="display-name">Display name:</label>
                    <input v-model="displayNameInput" id="display-name" type="text">
                </div>
                <div>
                    <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Update</button>
                </div>
            </form>
            <form @submit.prevent="updateUserPhoneNumber" class="grid gap-4">
                <div class="grid gap-4">
                    <label for="phone-number">Phone number:</label>
                    <input v-model="phoneNumberInput" id="phone-number" type="tel">
                </div>
                <div>
                    <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Update</button>
                </div>
            </form>
            <form @submit.prevent class="grid gap-4">
                <div class="grid gap-4">
                    <label for="email">Email:</label>
                    <input v-model="emailInput" id="email" type="email">
                </div>
                <div class="flex gap-4 h-min">
                    <button @click="updateUserEmail" class="bg-yellow-50 py-2 px-6 rounded-xl">Update</button>
                    <button @click="verifyEmail" class="bg-yellow-50 py-2 px-6 rounded-xl">Verify email</button>
                </div>
            </form>
        </div>
        <div class="bg-purple-50">
            <p class="text-2xl">Update profile picture:</p>
            <img class="w-full max-w-[500px] bg-red-50 aspect-square" :src="profileImageSrc || store.state.user.photoURL" alt="Profile Picture"/>
            <div class="flex gap-4 items-center">
                <input type="file" @change="handleFileChange">
                <button @click="upload" class="bg-yellow-50 py-2 px-6 rounded-xl">upload</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    /*
        ISSUES TO SOLVE
        [ ] user data (coming from the vue store) is initialised as null. The component renders before user state is loaded
    */ 
    import { getAuth, updateProfile, updateEmail, sendEmailVerification, updatePhoneNumber } from "firebase/auth";
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
    //     setTimeout(()=>{
    //         // profileImageSrc.value = store.state.user.photoURL;
    //     },2000)
    // })

    async function updateUserDisplayName(){
        const userInfo = {}
        if(displayNameInput.value !== ""){
            userInfo.displayName = displayNameInput.value;
        }
        store.dispatch("showLoader");
        updateProfile(auth.currentUser,userInfo)
            .then(() =>{
                console.log("Profile Updated");
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() =>{
                store.dispatch("hideLoader");
            })
    }
    /*
        TODO:
        [ ] send OTP to users phone number
        [ ] have user enter OTP - Obtain linkToIdToken
        [ ] enter linkToIdToken as second parameter in updatePhoneNumber function call
    */
    async function updateUserPhoneNumber(){
        console.log("CLICKED...")
        if(phoneNumberInput.value === "") return;
        store.dispatch("showLoader");
        console.log(updatePhoneNumber)
        console.log(auth.currentUser)
        updatePhoneNumber(auth.currentUser, /* linkToIdToken */)
            .then(()=>{
                console.log("worked")
            })
            .catch(error =>{
                console.log(error)
            })
            .finally(()=>{
                store.dispatch("hideLoader");
            })
    }

    function updateUserEmail(){
        if(emailInput.value === ""){
            console.log("Email empty")
            return;
        }
        store.dispatch("showLoader");
        updateEmail(auth.currentUser, emailInput.value)
            .then(() =>{
                console.log("Email Updated")
            })
            .catch(error =>{
                console.log(error)
            })
            .finally(()=>{
                store.dispatch("hideLoader");
            })
    }

    async function verifyEmail(){
        store.dispatch("showLoader");
        sendEmailVerification(auth.currentUser)
            .then(() =>{
                console.log("Verification email sent")
            })
            .catch(error =>{
                console.log(error);
            })
            .finally(() =>{
                store.dispatch("hideLoader");
            })
    }

    function handleFileChange(e){
        tempFile = e.target.files[0]
    }

    /*
        TODO:
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
        }catch(error){
            console.log(error);
        }finally{
            store.dispatch("hideLoader");
        }
    }
</script>