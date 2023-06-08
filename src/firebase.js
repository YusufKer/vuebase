// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDigzwwyW9Xie64Do7jwdzsKmMg2oBoG_U",
  authDomain: "vuebase-23b35.firebaseapp.com",
  projectId: "vuebase-23b35",
  storageBucket: "vuebase-23b35.appspot.com",
  messagingSenderId: "960045387006",
  appId: "1:960045387006:web:dc1bfbb2baff4465d469af"
};

// Initialize Firebase + Storage + firestore
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db }