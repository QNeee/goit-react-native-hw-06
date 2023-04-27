import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOhhyDUDin_SPMrbLSN_aWJe4Srczpu0o",
    authDomain: "rn-social-5bf17.firebaseapp.com",
    projectId: "rn-social-5bf17",
    storageBucket: "rn-social-5bf17.appspot.com",
    messagingSenderId: "374968803768",
    appId: "1:374968803768:web:3abd3f13aadea17f552f4d",
    measurementId: "G-39ZW67Z3JC"
};

// Initialize Firebas
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);