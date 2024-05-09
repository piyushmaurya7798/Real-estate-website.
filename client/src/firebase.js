// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-7138b.firebaseapp.com",
  projectId: "realestate-7138b",
  storageBucket: "realestate-7138b.appspot.com",
  messagingSenderId: "3723611650",
  appId: "1:3723611650:web:8382fba9fe461ceebf611b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);