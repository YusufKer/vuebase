<template>
    <div>
        <Post v-for="(post,index) in posts" :key="index" :post-data="post"/>
    </div>
</template>

<script setup>
    /*
        TODO:
        [ ] build ui for posts
    */ 
    import { ref, onMounted } from 'vue';
    import { collection, query, where, getDocs } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { db } from "../firebase.js";

    const auth = getAuth();

    const posts = ref([]);
    
    onMounted(async()=>{
        const postsArray = [];
        const q = query(collection(db, "posts"), where("userUid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            postsArray.push(doc.data());
        });
        posts.value = postsArray;
    })

</script>