import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCZEMHSDUHIoAqfwt2mAhHzn66_n70SNd8",
  authDomain: "gym-management-1999b.firebaseapp.com",
  databaseURL: 'https://gym-management-1999b-default-rtdb.firebaseio.com/', // Realtime Database URL
  projectId: "gym-management-1999b",
  storageBucket: "gym-management-1999b.firebasestorage.com", // Corrected storageBucket URL
  messagingSenderId: "467895408110",
  appId: "1:467895408110:web:cdf703c90ce5c34ab1aaff",
  measurementId: "G-RGBKYZN2R1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const messaging = getMessaging(app);

export { app, auth, db, storage, database, messaging };
