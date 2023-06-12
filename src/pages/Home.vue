<template>
    <div v-if="store.state.user" class="p-4">
        <NewPost/>
        <br>
        <PostListing/>
    </div>
    <div v-else class="p-4">
        <p>Please log in</p>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    const store = useStore();
</script>