// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ ¡IMPORTANTE!
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlMOAaCoxevngRRF80R-8Q43PeYl8xCFQ",
  authDomain: "api-rest-node-js-data-22ad9.firebaseapp.com",
  projectId: "api-rest-node-js-data-22ad9",
  storageBucket: "api-rest-node-js-data-22ad9.firebasestorage.app",
  messagingSenderId: "413866610555",
  appId: "1:413866610555:web:3a23cf91fec2478abdf7de",
  measurementId: "G-9T9TNCRWVP"
};

//console.log('🔥 firebaseConfig:', firebaseConfig); 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);