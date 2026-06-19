import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfNPsZgUAfZXiq7Xa-fHJ-T1jHgufB9Cw",
  authDomain: "sentinelai-20a7b.firebaseapp.com",
  projectId: "sentinelai-20a7b",
  storageBucket: "sentinelai-20a7b.firebasestorage.app",
  messagingSenderId: "141537028819",
  appId: "1:141537028819:web:3c187f59273217480a0226",
  measurementId: "G-TYN62D8C6W"
};

// Initialize Firebase safely for HMR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
// analytics might not work depending on environment block
// export const analytics = getAnalytics(app);
