<template>
    <nav class="p-4 flex justify-between bg-red-50">
        <div><router-link to="/">Home</router-link></div>
        <ul class="flex gap-4">
            <template v-if="store.state.user">
                <li><router-link to="/dashboard">Dashboard</router-link></li>
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
    import { getAuth, signOut } from 'firebase/auth';
    import { useStore } from 'vuex';
    
    const store = useStore();
    const auth = getAuth();

    async function signout(){
        signOut(auth)
            .then(() =>{
                console.log("Signout successfull");
            })
            .catch(error =>{
                console.log(error);
            })
    }

</script>