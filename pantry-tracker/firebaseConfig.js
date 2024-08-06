// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "pantry-tracker-a70af.firebaseapp.com",
  projectId: "pantry-tracker-a70af",
  storageBucket: "pantry-tracker-a70af.appspot.com",
  messagingSenderId: "463597880029",
  appId: "1:463597880029:web:db71eb8965645298069134",
  measurementId: "G-CZN4XXZBQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Authentication (optional)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { db, auth, storage, analytics };
