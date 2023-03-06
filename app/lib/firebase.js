import { initializeApp } from "firebase/app";
import {
  getFirestore, // Initialize Firestore
  collection, // Make a reference to a collection
  getDocs, // Grab the documents from the collection ref
  doc, // Make a reference to a document in a collection
  getDoc, // Grab the document from the document ref
  onSnapshot, // Create a real-time listener to a collection or a document
  addDoc, // Add a document to a collection ref
  deleteDoc, // Delete a specific doc (requires doc ref)
  updateDoc, // Update a specific doc (requires doc ref)
  serverTimestamp, // Add a timestamp Server side
  query,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFunctions } from "firebase/functions";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-0Dj-7ll75ctB-b8AzjVHDE5Z8nKsBOo",
  authDomain: "next13-test-37cab.firebaseapp.com",
  projectId: "next13-test-37cab",
  storageBucket: "next13-test-37cab.appspot.com",
  messagingSenderId: "367709699147",
  appId: "1:367709699147:web:7bb307ff205729b9fc21ce",
  measurementId: "G-H85CQKZ9M2",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const funcs = getFunctions(app);
