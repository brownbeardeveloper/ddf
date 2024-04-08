import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBODLbN2YIIjStDKtQjli6UUhs-UhnxzW8",
  authDomain: "orebro-af53c.firebaseapp.com",
  projectId: "orebro-af53c",
  storageBucket: "orebro-af53c.appspot.com",
  messagingSenderId: "398905385460",
  appId: "1:398905385460:web:2f52037c7e77d7348c19a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();