// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASIsIQ2lya5N27Wv37Tioqd1qaAE7ovck",
  authDomain: "bridge-nyc-d1af1.firebaseapp.com",
  projectId: "bridge-nyc-d1af1",
  storageBucket: "bridge-nyc-d1af1.firebasestorage.app",
  messagingSenderId: "837051633250",
  appId: "1:837051633250:web:683d3456407851cd738b3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
// Force rebuild - updated 2025
