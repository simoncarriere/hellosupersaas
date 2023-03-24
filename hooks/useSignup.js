"use client";
import { useState } from "react";
// Custom Hooks
import { useAuthContext } from "../hooks/useAuthContext";
// Firebase Imports
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  // Form Handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = (email, password, displayName) => {
    setError(null);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        // Denormalize user email & uuid with custom doc id of uuid
        try {
          let ref = collection(db, "users");
          setDoc(doc(ref, res.user.uid), {
            uid: res.user.uid,
            email: res.user.email,
            displayName: displayName,
          });
        } catch (err) {
          console.error(err.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError("Failed to create an account. Email already in use.");
        setLoading(false);
      });
  };

  return { error, loading, signup };
};
