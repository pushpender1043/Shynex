import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-c8b3c.firebaseapp.com",
  projectId: "loginonecart-c8b3c",
  storageBucket: "loginonecart-c8b3c.firebasestorage.app",
  messagingSenderId: "290222007729",
  appId: "1:290222007729:web:99c162c70cd2cbcfbc8990"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

//provider-->to tell for whom it has to work
const provider= new GoogleAuthProvider()

export {auth,provider}