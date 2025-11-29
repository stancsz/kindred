// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzfFLwvemEz0Hc5Le-xZvD2pgbUSaFVk4",
  authDomain: "kindred-852d1.firebaseapp.com",
  projectId: "kindred-852d1",
  storageBucket: "kindred-852d1.firebasestorage.app",
  messagingSenderId: "728840956976",
  appId: "1:728840956976:web:02614d81a0f7e295bc11f5",
  measurementId: "G-76NGD8ZMJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
