// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkmiRjoIIJW4CGVeJrSKCRrLUdFnTf2JM",
  authDomain: "mobile-crossplat.firebaseapp.com",
  projectId: "mobile-crossplat",
  storageBucket: "mobile-crossplat.firebasestorage.app",
  messagingSenderId: "376783126390",
  appId: "1:376783126390:web:437df3cc3d0d06001a0457",
  measurementId: "G-NT5P4DXZF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();

export default firebaseConfig;