import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: "login-d75ec.firebaseapp.com",
  projectId: "login-d75ec",
  storageBucket: "login-d75ec.firebasestorage.app",
  messagingSenderId: "374981580492",
  appId: "1:374981580492:web:ef22f43d85d213d9f51469",
  measurementId: "G-DTB8SVDSPW"
  
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

//provider-->to tell for whom it has to work
const provider= new GoogleAuthProvider()

export {auth,provider}