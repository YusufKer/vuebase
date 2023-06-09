<template>
    <div class="bg-green-50 border p-4">
        <p>{{ postData.textContent }}</p>
        <img v-if="postData.imageUrl" :src="postData.imageUrl" alt="" class="max-w-[350px]">
        <p><small>{{ formattedDate }}</small></p>
        <Comment :post-id="postData.id"/>
    </div>
</template>

<script setup>
    /*
        TODO:
        [ ] fix image url in post component to get a proper src instead of whatever this is:
            https://firebasestorage.googleapis.com/v0/b/vuebase-23b35.appspot.com/o/posts%2FFL9bqGvr92Quf19pHhLIJNu4ap43%2Flogo_black02.jpg?alt=media&token=bfc1dee4-4e35-4c92-abf5-8379215d81b6
    */ 
    import { computed } from 'vue';
    
    const props = defineProps([
        'postData'
    ])
    const formattedDate = computed(() =>{
        const date = props.postData.date.toDate();
        return date;
    })

</script>