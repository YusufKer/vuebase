<template>
    <form @submit.prevent="postComment" class="grid gap-4">
        <label :for="postId">Comment:</label>
        <textarea v-model="commentTextInput" class="w-full" :id="postId" ></textarea>
        <button type="submit" :disabled="!commentTextInput" class="bg-red-50 py-2 px-6 rounded-xl">Comment</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import { auth } from "firebase/auth";
    
    const props = defineProps([
        'postId'
    ])

    const commentTextInput = ref("");

    function postComment(){
        alert("test")
        if(commentTextInput.value === "") return;
        const commentObject = {};

    }
</script>