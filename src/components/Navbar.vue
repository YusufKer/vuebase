<template>
    <nav class="p-4 flex justify-between bg-red-50">
        <div class="flex gap-4">
            <router-link to="/">Home</router-link>
            <template v-if="store.state.user">
                <router-link to="/profile">Profile</router-link>
            </template>
        </div>
        
        <ul class="flex gap-4">
            <li><router-link to="/about-us">About us</router-link></li>
            <li><router-link to="/contact-us">Contact us</router-link></li>
            <template v-if="store.state.user">
                <li><a @click="signout">Sign out</a></li>
            </template>
            <template v-else>
                <li><router-link to="/signup">Signup</router-link></li>
                <li><router-link to="/signin">Signin</router-link></li>
            </template>
        </ul>
    </nav>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { getAuth, signOut } from 'firebase/auth';
    import { useStore } from 'vuex';
    
    const store = useStore();
    const auth = getAuth();
    const router = useRouter();

    async function signout(){
        store.dispatch("showLoader");
        signOut(auth)
            .then(() =>{
                console.log("Signout successfull");
                router.push("/");
            })
            .catch(error =>{
                console.log(error);
            })
            .finally(()=>{
                store.dispatch("hideLoader");
            })
    }

</script>