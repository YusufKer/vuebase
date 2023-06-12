<template>
    <div class="grid gap-4">
        <div v-for="(comment, index) in formattedComments" :key="index" class="bg-pink-200">
            <p>{{ comment.commentBody }}</p>
            <p><small>{{comment.userDisplayName}} <span class="bg-yellow-50">{{ formatDate(comment.date) }}</span></small></p>
        </div>
        <form @submit.prevent="postComment" class="grid gap-4">
            <label :for="postId">Comment:</label>
            <textarea v-model="commentTextInput" class="w-full" :id="postId" ></textarea>
            <button type="submit" :disabled="!commentTextInput" class="bg-red-50 py-2 px-6 rounded-xl">Comment</button>
        </form>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
    import { db } from '../firebase';
    import { useStore } from "../store";

    const store = useStore();
    
    const props = defineProps([
        'postId',
        'comments'
    ])

    const formattedComments = computed(() =>{
        const formattedByDate = props.comments.sort((a,b) => a.date.seconds < b.date.seconds)
        return formattedByDate
    })

    function formatDate(firebaseDate){
        const date = firebaseDate.toDate();
        return date;
    }

    const commentTextInput = ref("");

    async function postComment(){
        if(commentTextInput.value === "") return;
        store.dispatch("showLoader");
        const comments = props.comments;
        const commentObject = {
            userUid: store.state.user.uid,
            userDisplayName:store.state.user.displayName,
            commentBody: commentTextInput.value,
            date: Timestamp.fromDate(new Date()),
        };
        comments.push(commentObject);
        const postsRef = doc(db, "posts", props.postId);
        
        await updateDoc(postsRef, {
            comments: arrayUnion(commentObject)
        })
        .then(()=>{
            console.log("success")
            commentTextInput.value = "";
        })
        .catch(error =>{
            console.log(error)
        })
        .finally(()=>{
            store.dispatch("hideLoader");
        })
    }

</script>