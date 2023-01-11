import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA4iD8aKqojPkNQbiUwOH3DWh2DQ2vc8bE",
  authDomain: "chat2-26296.firebaseapp.com",
  projectId: "chat2-26296",
  storageBucket: "chat2-26296.appspot.com",
  messagingSenderId: "411378164247",
  appId: "1:411378164247:web:01377deb8c9ccf98f97252"
};
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth()
 export const storage = getStorage()
 export const db = getFirestore(app)
