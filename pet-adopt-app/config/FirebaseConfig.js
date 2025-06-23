// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-projects-71ffd.firebaseapp.com",
  projectId: "my-projects-71ffd",
  storageBucket: "my-projects-71ffd.firebasestorage.app",
  messagingSenderId: "639803543703",
  appId: "1:639803543703:web:7e566b995c9ea3e89359d2",
  measurementId: "G-MM37M96ZSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);