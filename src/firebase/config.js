// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHwMPWVO8_layOzfKtCmIkYWPoqvVaAr4",
  authDomain: "joystickguild-fa0a0.firebaseapp.com",
  projectId: "joystickguild-fa0a0",
  storageBucket: "joystickguild-fa0a0.appspot.com",
  messagingSenderId: "727401871410",
  appId: "1:727401871410:web:9e7cfabb5d0c8b4a94642b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
