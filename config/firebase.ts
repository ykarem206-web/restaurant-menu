import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAM4vD9aAZR31Htvy5IkvI5W4ddylBtrF4",
  authDomain: "forsan-elsham-menu.firebaseapp.com",
  projectId: "forsan-elsham-menu",
  storageBucket: "forsan-elsham-menu.firebasestorage.app",
  messagingSenderId: "131288851554",
  appId: "1:131288851554:web:6f00f04c6fcbbbf9535d3b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);