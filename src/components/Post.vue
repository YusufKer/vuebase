<template>
    <div class="bg-green-50 border p-4">
        <p>{{ postData.textContent }}</p>
        <img v-if="postData.imageUrl" :src="postData.imageUrl" alt="" class="max-w-[350px]">
        <p><small>{{ formattedDate }}</small></p>
        <div class="flex gap-4">
            <Comment :post-id="postData.id" :comments="postData.comments" class="flex-1"/>
            <button @click="deletePost(postData.id)" class="h-10  bg-red-400 px-4 rounded-lg self-end">Delete</button>
        </div>
    </div>
</template>

<script setup>
    import { doc, deleteDoc } from "firebase/firestore";
    import { computed } from 'vue';
    import { db } from "../firebase";
    import { useStore } from "../store";
    
    const props = defineProps([
        'postData'
    ])
    const formattedDate = computed(() =>{
        const date = props.postData.date.toDate();
        return date;
    })
    const store = useStore();

    async function deletePost(postId){
        store.dispatch("showLoader");
        await deleteDoc(doc(db, "posts", postId))
            .then(()=>{
                console.log(`document with id: ${postId} deleted.`)
            })
            .catch(error =>{
                console.log(error);
            })
            .finally(()=>{
                store.dispatch("hideLoader");
            })
    }

</script>