<template>
  <div class="container bg-blue-50">
    <Loader/>
    <Navbar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script setup>
  import { useStore } from "./store";

  const store = useStore();
</script>