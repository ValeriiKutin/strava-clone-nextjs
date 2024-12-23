// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API,
    authDomain: "strava-clone-nextjs.firebaseapp.com",
    projectId: "strava-clone-nextjs",
    storageBucket: "strava-clone-nextjs.firebasestorage.app",
    messagingSenderId: "918032089221",
    appId: "1:918032089221:web:2c3fee889e73d659a429ec",
    measurementId: "G-D4ZKZDZ78W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
