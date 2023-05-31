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
    import { useRouter } from 'vue-router';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
    import { useStore } from 'vuex';
    import { ref } from 'vue';
    import { validate } from '../utils/utils';

    const auth = getAuth();
    const router = useRouter();
    const store = useStore();

    const emailInput = ref('');
    const passwordInput = ref('');
    const errorMessage = ref('');


    function submit(){
        if(!validate('PASSWORD', passwordInput.value)) return;
        store.dispatch("showLoader");
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(userCredential =>{
                const user = userCredential.user;
                router.push("/");
            })
            .catch(error =>{
                errorMessage.value = error.message;
            })
            .finally(()=>{
                store.dispatch("hideLoader");
            })
    }
</script>