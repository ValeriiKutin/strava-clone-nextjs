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
  authDomain: "prac-crud-with-bd.firebaseapp.com",
  projectId: "prac-crud-with-bd",
  storageBucket: "prac-crud-with-bd.appspot.com",
  messagingSenderId: "932131948988",
  appId: "1:932131948988:web:d583fe2431596ad06e43b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
