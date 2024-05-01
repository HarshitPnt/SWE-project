// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD-OkhXbHwHm0hIBSJPo_tdRrkD-ig7ckI",
  authDomain: "reddit-clone-421608.firebaseapp.com",
  projectId: "reddit-clone-421608",
  storageBucket: "reddit-clone-421608.appspot.com",
  messagingSenderId: "135928722082",
  appId: "1:135928722082:web:9a5e21f11e826fd16eddfb",
  measurementId: "G-SESM6RPDED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
