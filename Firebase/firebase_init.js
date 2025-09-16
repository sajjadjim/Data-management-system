import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey:import.meta.env.VITE_API_KEY,
    // authDomain:import.meta.env.VITE_AUTH_DOMAIN,
    // projectId:import.meta.env.VITE_PROJECT_ID,
    // storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
    // messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
    // appId:import.meta.env.VITE_APP_ID
  apiKey: "AIzaSyCZ_DvwQtM-_VhoctkxlJSAm48lxhodWAA",
  authDomain: "electronic-products-management.firebaseapp.com",
  projectId: "electronic-products-management",
  storageBucket: "electronic-products-management.firebasestorage.app",
  messagingSenderId: "357794675189",
  appId: "1:357794675189:web:1f2d3225d9de7e234e08bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);