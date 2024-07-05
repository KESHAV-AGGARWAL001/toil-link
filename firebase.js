import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRHvurQahiDlESrcA6rDSJMTAOXFYYfYk",
  authDomain: "udyam-3da74.firebaseapp.com",
  databaseURL: "https://udyam-3da74-default-rtdb.firebaseio.com",
  projectId: "udyam-3da74",
  storageBucket: "udyam-3da74.appspot.com",
  messagingSenderId: "594458326302",
  appId: "1:594458326302:web:1c12851d77abb099f5850f",
  measurementId: "G-PT0K688MDY",
};
firebase.intializeApp(firebaseConfig);

export default firebase;
