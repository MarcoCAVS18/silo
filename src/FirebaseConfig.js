// FirebaseConfig.js

// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase directamente en el código
const firebaseConfig = {
  apiKey: "AIzaSyB4X12V-NwRCJS4WYay_lL2HtEWknYxx1U",  // Reemplaza con tu apiKey
  authDomain: "viterra-fe362.firebaseapp.com",      // Reemplaza con tu authDomain
  projectId: "viterra-fe362",                       // Reemplaza con tu projectId
  storageBucket: "viterra-fe362.appspot.com",       // Reemplaza con tu storageBucket
  messagingSenderId: "741934890952",               // Reemplaza con tu messagingSenderId
  appId: "1:741934890952:web:302984e10a7f51568acafd",  // Reemplaza con tu appId
  measurementId: "G-XDBY6PF1V3"                    // Reemplaza con tu measurementId
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar la configuración para usarla en otras partes de tu aplicación
export { app, db };
