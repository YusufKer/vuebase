import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from './store.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03RMV9JbJuR9uMB6DMshJGCAy6hckvdg",
  authDomain: "vuebase-9d6ba.firebaseapp.com",
  projectId: "vuebase-9d6ba",
  storageBucket: "vuebase-9d6ba.appspot.com",
  messagingSenderId: "150041959336",
  appId: "1:150041959336:web:4c483da0fa4f3025e45b9d"
};

// IMPORT CSS
import './style.css';

// IMPORT ENTRY POINT
import App from './App.vue';

// IMPORT PAGES
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import AboutUs from './pages/AboutUs.vue';
import ContactUs from './pages/ContactUs.vue';

// IMPORT COMPONENTS
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Loader from './components/Loader.vue';

// DEFINE ROUTES
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
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {title: "Dashboard"}
    },
    {
        path: '/about-us',
        component: AboutUs,
        meta: {title: "About us"}
    },
    {
        path: '/contact-us',
        component: ContactUs,
        meta: {title: "Contact us"}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Initialize Firebase + Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Store
const store = useStore();

// CREATE VUE APP
const vueApp = createApp(App);

// REGISTER COMPONENTS 
vueApp.component("Navbar", Navbar);
vueApp.component("Footer", Footer);
vueApp.component("Loader", Loader);

// USE ROUTER
vueApp.use(router);

// USE STORE
vueApp.use(store);

// MOUNT APP
vueApp.mount('#app')
