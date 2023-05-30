<template>
    <div v-if="store.state.loading" class="w-screen h-screen z-10 bg-yellow-50 sticky top-0 flex justify-center items-center">
        <h1>LOADING</h1>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    const store = useStore();
</script>