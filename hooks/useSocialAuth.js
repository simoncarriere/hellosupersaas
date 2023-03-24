"use client";
import { useState, useEffect } from "react";
// Firebase Imports
import { auth, db } from "../lib/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
// Access our auth context dispatch function
import { useAuthContext } from "./useAuthContext";

// Social Providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useSocialAuth = () => {
  const { dispatch } = useAuthContext();

  // Form Handling
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false); // For Cleanup

  const socialSignup = async (provider) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider).then((res) => {
        // Denormalize user email & uuid with custom doc id of uuid
        try {
          let ref = collection(db, "users");
          setDoc(doc(ref, res.user.uid), {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
          });
        } catch (err) {
          console.error(err.message);
        }
        dispatch({ type: "LOGIN", payload: res.user });
      });

      // .then(() => {
      //   console.log("after social router");
      // });

      //  // Get the user's ID token as it is needed to exchange for a session cookie.
      //  const credential = provider.credentialFromResult(res);
      //  const token = credential.accessToken;

      // Not getting a response at all (example network connection)
      if (!res) {
        setError("Could not complete signup");
      }

      // Check for abort
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      // Example : Email taken
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // Cleanup Function will only return on component unmount (Cancel pending async request)
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    socialSignup,
    googleProvider,
    githubProvider,
    twitterProvider,
    error,
    isPending,
  };
};
