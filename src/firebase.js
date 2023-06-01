// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03RMV9JbJuR9uMB6DMshJGCAy6hckvdg",
  authDomain: "vuebase-9d6ba.firebaseapp.com",
  projectId: "vuebase-9d6ba",
  storageBucket: "vuebase-9d6ba.appspot.com",
  messagingSenderId: "150041959336",
  appId: "1:150041959336:web:4c483da0fa4f3025e45b9d"
};

// Initialize Firebase + Storage + firestore
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db }