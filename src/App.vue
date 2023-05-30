<template>
  <div class="container bg-blue-50">
    <Loader/>
    <Navbar/>
    <router-view></router-view>
    <div @click="$store.dispatch('increment',12)">TEST VUEX</div>
    <div>{{ user }}</div>
    <Footer/>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { getAuth } from 'firebase/auth';

  const auth = getAuth();

  const store = useStore();

  const count = computed(() => store.getters.getCount);
  const user = computed(() => store.getters.getUser);

  auth.onAuthStateChanged(firebaseUser =>{
    store.dispatch('signInUser', firebaseUser);
  })
</script>