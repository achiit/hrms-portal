import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCul7zBDsrdB_4yk9naODhN1ADY6koweoY",
  authDomain: "attendance-c79fb.firebaseapp.com",
  projectId: "attendance-c79fb",
  storageBucket: "attendance-c79fb.firebasestorage.app",
  messagingSenderId: "997589628097",
  appId: "1:997589628097:web:4d2f4030da8412c3bf5040",
  measurementId: "G-MR4K6VXTZD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);