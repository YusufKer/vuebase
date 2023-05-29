import { createStore } from 'vuex';

const store = createStore({
    
    state(){
        return {
            user: null,
            count: 0
        }
    },

    mutations: {
        increment(state, payload){
            state.count += payload;
        },
        signInUser(state, payload){
            state.user = payload;
        }
    },

    actions: {
        increment(context,payload){
            context.commit('increment',payload);
        },
        signInUser(context,payload){
            context.commit('signInUser',payload);
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