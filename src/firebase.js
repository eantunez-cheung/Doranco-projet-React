// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChQnFVlA9cuFn1x391JhOCyGEhCpQ9VfA",
  authDomain: "cookthat-7962c.firebaseapp.com",
  projectId: "cookthat-7962c",
  storageBucket: "cookthat-7962c.appspot.com",
  messagingSenderId: "196002788785",
  appId: "1:196002788785:web:44fbffb17928ab5a0a7990",
  measurementId: "G-KRBY44HB3R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
