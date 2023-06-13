import { createStore } from 'vuex';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase.js';

const auth = getAuth();

const store = createStore({
    
    state(){
        return {
            user: null,
            loading: false,
            posts: []
        }
    },

    mutations: {
        signInUser(state, payload){
            state.user = payload;
        },
        setLoading(state, payload){
            state.loading = payload;
        },
        setPosts(state, payload){
            state.posts = payload;
        }
    },

    actions: {
        signInUser(context,payload){
            context.commit('signInUser',payload);
        },
        showLoader(context){
            context.commit('setLoading', true);
        },
        hideLoader(context){
            context.commit('setLoading', false);
        },
        async getUsersPosts(context){
            const postsArray = [];
            const q = query(collection(db, "posts"), where("userUid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc =>{
                postsArray.push({...doc.data(),id:doc.id});
            })
            const sortedPostsArray = postsArray.sort((a,b) => a.date.seconds > b.date.seconds)
            context.commit('setPosts', sortedPostsArray);
        }
    },
    getters: {
        getUser: state => state.user,
        getPosts: state => state.posts
    }
})

export function useStore(){
    return store;
}