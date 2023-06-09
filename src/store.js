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
        setPosts(context, payload){
            context.commit('setPosts', payload);
        },
        async getUsersPosts(context){
            const postsArray = [];
            const q = query(collection(db, "posts"), where("userUid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc =>{
                postsArray.push(doc.data());
            })
            context.commit('setPosts', postsArray);
        }
    },
    getters: {
        getCount: state => state.count,
        getUser: state => state.user,
        getPosts: state => state.posts
    }
})

export function useStore(){
    return store;
}