<template>
  <div class="container bg-blue-50">
    <Loader/>
    <Navbar/>
    <router-view></router-view>
    <div>{{ store.state.user }}</div>
    <Footer/>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { getAuth } from 'firebase/auth';

  const auth = getAuth();
  const store = useStore();

  auth.onAuthStateChanged(firebaseUser =>{
    store.dispatch('signInUser', firebaseUser);
  })
</script>