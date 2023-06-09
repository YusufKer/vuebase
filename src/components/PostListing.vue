<template>
    <div class="p-4 bg-yellow-50 grid gap-4">
        <button @click.prevent="() => store.dispatch('getUsersPosts')" class="bg-red-50 py-2 px-6 rounded-xl">Refresh</button>
        <Post v-for="(post,index) in store.state.posts" :key="index" :post-data="post"/>
    </div>
</template>

<script setup>
    /*
        TODO:
        [ ] build ui for posts
    */ 
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();

    onMounted(()=>{
        if(store.state.posts.length > 0) return
        store.dispatch("getUsersPosts");
    })

</script>