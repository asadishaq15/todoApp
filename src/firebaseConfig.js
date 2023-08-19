import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getDatabase }from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRtnKZ7SvXt-UwdfMO8fTnVa5IgBwX7E0",
  authDomain: "todoapp-5a8fe.firebaseapp.com",
  projectId: "todoapp-5a8fe",
  storageBucket: "todoapp-5a8fe.appspot.com",
  messagingSenderId: "153865001070",
  appId: "1:153865001070:web:3aa095bb192e0852762e7f",
  measurementId: "G-6W57G27NWD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app); 
const provider = new GoogleAuthProvider();
const database=getDatabase(app);

export { db, provider, auth, storage ,database}; 
