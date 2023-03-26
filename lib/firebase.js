import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyANcDXMEa7At5heaJbEPKTOe9fMBSsiK5k",
  authDomain: "saasboiler-c568c.firebaseapp.com",
  projectId: "saasboiler-c568c",
  storageBucket: "saasboiler-c568c.appspot.com",
  messagingSenderId: "720648597308",
  appId: "1:720648597308:web:a031e433c4733ec65cb839",
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const funcs = getFunctions(app);
