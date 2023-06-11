<template>
    <form @submit.prevent="postComment" class="grid gap-4">
        <label :for="postId">Comment:</label>
        <textarea v-model="commentTextInput" class="w-full" :id="postId" ></textarea>
        <button type="submit" :disabled="!commentTextInput" class="bg-red-50 py-2 px-6 rounded-xl">Comment</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from "../store";

    const store = useStore();
    
    const props = defineProps([
        'postId',
        'comments'
    ])

    const commentTextInput = ref("");

    async function postComment(){
        if(commentTextInput.value === "") return;
        const comments = props.comments;
        const commentObject = {
            userUid: store.state.user.uid,
            userDisplayName:store.state.user.displayName,
            commentBody: commentTextInput.value
        };
        comments.push(commentObject);
    }

</script>