// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWlB_Hsw68c1ps3WzYbRXubM1Hh2LiY6A",
  authDomain: "dragdroptodo.firebaseapp.com",
  projectId: "dragdroptodo",
  storageBucket: "dragdroptodo.appspot.com",
  messagingSenderId: "352014062158",
  appId: "1:352014062158:web:7ec0b133aebb946b08e91f",
  measurementId: "G-8F8EC6SW9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
