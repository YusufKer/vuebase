<template>
  <div class="container bg-blue-50">
    <Navbar/>
    <router-view></router-view>
    <div @click="$store.commit('increment')">TEST VUEX</div>
    <div>{{ count }}</div>
    <Footer/>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const count = computed(() => store.getters.getCount);
</script>