// FirebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4X12V-NwRCJS4WYay_lL2HtEWknYxx1U",  
  authDomain: "viterra-fe362.firebaseapp.com",      
  projectId: "viterra-fe362",                     
  storageBucket: "viterra-fe362.appspot.com",       
  messagingSenderId: "741934890952",               
  appId: "1:741934890952:web:302984e10a7f51568acafd",  
  measurementId: "G-XDBY6PF1V3"                    
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
