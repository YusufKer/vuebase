import { createStore } from 'vuex';

const store = createStore({
    
    state(){
        return {
            user: null,
            count: 0,
            loading: false
        }
    },

    mutations: {
        increment(state, payload){
            state.count += payload;
        },
        signInUser(state, payload){
            state.user = payload;
        },
        setLoading(state, payload){
            state.loading = payload;
        }
    },

    actions: {
        increment(context,payload){
            context.commit('increment',payload);
        },
        signInUser(context,payload){
            context.commit('signInUser',payload);
        },
        showLoader(context){
            context.commit('setLoading', true);
        },
        hideLoader(context){
            context.commit('setLoading', false);
        }
    },

    getters: {
        getCount: state => state.count,
        getUser: state => state.user
    }
})

export function useStore(){
    return store;
}