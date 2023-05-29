<template>
    <div class="p-4">
        <form @submit.prevent="submit" class="grid gap-4">
            <div class="grid gap-4">
                <label for="display-name">Display name:</label>
                <input v-model="displayNameInput" id="display-name" type="text">
            </div>
            <div class="grid gap-4">
                <label for="email">Email:</label>
                <input v-model="emailInput" id="email" type="email">
            </div>
            <div class="grid gap-4">
                <label for="phone-number">Phone number:</label>
                <input v-model="phoneNumberInput" id="phone-number" type="tel">
            </div>
            <div>
                <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    // import { currentUser } from "firebase/auth"; 
    import { ref } from 'vue';


    const displayNameInput = ref("");
    const emailInput = ref("");
    const phoneNumberInput = ref("");

    const userInfo = {}

    async function submit(){
        if(displayNameInput.value !== ""){
            userInfo.displayName = displayNameInput.value;
        }
        if(emailInput.value !== ""){
            userInfo.email = emailInput.value;
        }
        if(phoneNumberInput.value !== ""){
            userInfo.phoneNumber = phoneNumberInput.value;
        }
        // try{
        //     await currentUser.updateProfile(userInfo)
        // }catch(error){
        //     console.log(error);
        // }
    }
</script>