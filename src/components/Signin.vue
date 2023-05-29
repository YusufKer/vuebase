<template>
    <form @submit.prevent="submit" class="grid gap-6 p-4">
        <h2>Sign In:</h2>
        <div class="grid gap-4">
            <label for="email">Email:</label>
            <input type="email" v-model="emailInput">
        </div>
        <div class="grid gap-4">
            <label for="password">Password:</label>
            <input type="password" v-model="passwordInput">
        </div>
        <div>
            <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Submit</button>
            <p>{{ errorMessage }}</p>
        </div>
    </form>
</template>

<script setup>
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
    import { ref } from 'vue';
    import { validate } from '../utils/utils';

    const emailInput = ref('');
    const passwordInput = ref('');
    const errorMessage = ref('');

    const auth = getAuth();

    function submit(){
        if(!validate('PASSWORD', passwordInput.value)) return;
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(userCredential =>{
                const user = userCredential.user;
                console.log({message:"Sign in success",user});
            })
            .catch(error =>{
                errorMessage.value = error.message;
            })
    }
</script>