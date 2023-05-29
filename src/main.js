import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from './store.js';

// IMPORT CSS
import './style.css';

// IMPORT ENTRY POINT
import App from './App.vue';

// IMPORT PAGES
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Home from './pages/Home.vue';

// IMPORT COMPONENTS
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const routes = [
    {
        path: '/',
        component: Home,
        meta: {title: "Home"}
    },
    {
        path: '/signup',
        component: Signup,
        meta: { title: "Signup" }
    },
    {
        path: '/signin',
        component: Signin,
        meta: { title: "Signin"}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03RMV9JbJuR9uMB6DMshJGCAy6hckvdg",
  authDomain: "vuebase-9d6ba.firebaseapp.com",
  projectId: "vuebase-9d6ba",
  storageBucket: "vuebase-9d6ba.appspot.com",
  messagingSenderId: "150041959336",
  appId: "1:150041959336:web:4c483da0fa4f3025e45b9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Store
const store = useStore();
// CREATE VUE APP
const vueApp = createApp(App);
// REGISTER COMPONENTS 
vueApp.component("Navbar", Navbar);
vueApp.component("Footer", Footer);
// USE ROUTER
vueApp.use(router);
// USE STORE
vueApp.use(store);
// MOUNT APP
vueApp.mount('#app')