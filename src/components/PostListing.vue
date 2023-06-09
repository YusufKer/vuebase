<template>
    <div class="p-4 bg-yellow-50 grid gap-4">
        <button @click.prevent="() => store.dispatch('getUsersPosts')" class="bg-red-50 py-2 px-6 rounded-xl">Refresh</button>
        <Post v-for="(post,index) in formatedPosts" :key="index" :post-data="post"/>
    </div>
</template>

<script setup>
    /*
        TODO:
        [ ] build ui for posts
    */ 
    import { onMounted, computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const formatedPosts = computed(()=>{
        const formattedByDate = store.state.posts.sort((a,b) => a.date.seconds < b.date.seconds);
        return formattedByDate
    })

    onMounted(()=>{
        if(store.state.posts.length > 0) return
        store.dispatch("getUsersPosts");
    })

</script>