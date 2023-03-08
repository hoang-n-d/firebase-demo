// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaT4ws9bd4WUPhRI3qMhjhwkAOL37igRE",
  authDomain: "fir-demo-fe2f0.firebaseapp.com",
  projectId: "fir-demo-fe2f0",
  storageBucket: "fir-demo-fe2f0.appspot.com",
  messagingSenderId: "1080217591325",
  appId: "1:1080217591325:web:fc4084db55f3dce09230f4",
  measurementId: "G-NVPN9ZT0LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();