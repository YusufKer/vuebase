import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from './store.js';
import './firebase.js'

// IMPORT CSS
import './style.css';

// IMPORT ENTRY POINT
import App from './App.vue';

// IMPORT PAGES
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Home from './pages/Home.vue';
import Profile from './pages/Profile.vue';
import AboutUs from './pages/AboutUs.vue';
import ContactUs from './pages/ContactUs.vue';

// IMPORT COMPONENTS
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Loader from './components/Loader.vue';
import NewPost from './components/NewPost.vue';
import PostListing from './components/PostListing.vue';
import Post from './components/Post.vue';
import Comment from './components/Comment.vue';

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
        path: '/profile',
        component: Profile,
        meta: {title: "Profile"}
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

// Initialize Store
const store = useStore();

// CREATE VUE APP
const vueApp = createApp(App);

// REGISTER COMPONENTS 
vueApp.component("Navbar", Navbar);
vueApp.component("Footer", Footer);
vueApp.component("Loader", Loader);
vueApp.component("NewPost", NewPost);
vueApp.component("PostListing", PostListing);
vueApp.component("Post", Post);
vueApp.component("Comment", Comment);

// USE ROUTER, STORE
vueApp.use(router);
vueApp.use(store);

// MOUNT APP
vueApp.mount('#app')
