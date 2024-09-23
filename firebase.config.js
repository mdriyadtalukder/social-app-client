// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH6TkTIQj4QOEcVECmZ_mK4mfEw9onko4",
  authDomain: "social-app-99a2d.firebaseapp.com",
  projectId: "social-app-99a2d",
  storageBucket: "social-app-99a2d.appspot.com",
  messagingSenderId: "364898485423",
  appId: "1:364898485423:web:16f796170911ebee7d005a"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);