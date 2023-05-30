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
            <img class="w-full bg-red-50 aspect-square" src="" alt="Profile Picture"/>
            <input type="file" @change="handleFileChange">
            <button @click="test">test</button>
        </div>
    </div>
</template>

<script setup>
    import { getAuth, updateProfile, updateEmail, sendEmailVerification } from "firebase/auth"
    import { getStorage, ref as firebaseRef } from 'firebase/storage';
    import { ref } from 'vue';

    const auth = getAuth();
    const storage = getStorage();
    const storageRef = firebaseRef(storage, "user-images");

    const displayNameInput = ref("");
    const emailInput = ref("");
    const phoneNumberInput = ref("");

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
        console.log("change")
        console.log(e.target.files[0])
    }

    function test(){
        console.log(storageRef)

    }
</script>