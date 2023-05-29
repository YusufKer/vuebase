<template>
    <form @submit.prevent="submit" class="grid gap-6 p-4">
        <h2>Sign Up:</h2>
        <div class="grid gap-4">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="emailInput">
        </div>
        <div class="grid gap-4">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="passwordInput">
        </div>
        <div class="grid gap-4">
            <label for="confirm-password">Confirm password:</label>
            <input type="password" id="confirm-password" v-model="confirmPasswordInput">
        </div>
        <div>
            <button type="submit" class="bg-yellow-50 py-2 px-6 rounded-xl">Submit</button>
            <p>{{ errorMessage }}</p>
        </div>
    </form>
</template>

<script setup>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useStore } from 'vuex';
    import { ref } from "vue";
    import { validate } from "../utils/utils";

    const store = useStore();

    const auth = getAuth();

    const emailInput = ref("");
    const passwordInput = ref("");
    const confirmPasswordInput = ref("");
    const errorMessage = ref("");

    function submit(){
        if(!validate('PASSWORD', passwordInput.value)) return;
        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(userCredentials =>{
                const user = userCredentials.user;
                store.dispatch('signInUser', user);
            })
            .catch(error =>{
                errorMessage.value = error.message;
            })
    }
</script>