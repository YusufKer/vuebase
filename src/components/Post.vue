<template>
    <div class="bg-green-50 border p-4">
        <p>{{ postData.textContent }}</p>
        <img v-if="postData.imageUrl" :src="postData.imageUrl" alt="" class="max-w-[350px]">
        <p><small>{{ formattedDate }}</small></p>
        <Comment :post-id="postData.id" :comments="postData.comments"/>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    
    const props = defineProps([
        'postData'
    ])

    const formattedDate = computed(() =>{
        const date = props.postData.date.toDate();
        return date;
    })

</script>