<template>
  <div class="container bg-blue-50">
    <Loader/>
    <Navbar/>
    <router-view></router-view>
    <div>{{ user }}</div>
    <Footer/>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { getAuth } from 'firebase/auth';

  const auth = getAuth();
  const store = useStore();
  const user = computed(() => store.getters.getUser);

  auth.onAuthStateChanged(firebaseUser =>{
    store.dispatch('signInUser', firebaseUser);
  })
</script>