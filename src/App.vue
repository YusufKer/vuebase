<template>
  <div class="container bg-blue-50 relative">
    <Loader/>
    <Navbar/>
    <router-view></router-view>
    <div @click="$store.dispatch('increment',12)">TEST VUEX</div>
    <div>{{ count }}</div>
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

  onMounted(()=>{
    auth.onAuthStateChanged(firebaseUser =>{
      store.dispatch('signInUser', firebaseUser);
    })
  })
</script>