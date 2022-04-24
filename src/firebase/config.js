// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkOcYZj8cKsTh5mbJqKu62uVAwh8bp9qM",
  authDomain: "punchline-rj.firebaseapp.com",
  projectId: "punchline-rj",
  storageBucket: "punchline-rj.appspot.com",
  messagingSenderId: "1085291749857",
  appId: "1:1085291749857:web:ac99a26abf8e65406ff2a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const storage = getStorage(app);