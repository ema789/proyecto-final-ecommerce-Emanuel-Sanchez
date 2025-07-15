// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ ¡IMPORTANTE!


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "api-rest-node-js-data-22ad9",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "413866610555",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-9T9TNCRWVP"
};

//console.log('🔥 firebaseConfig:', firebaseConfig); 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);