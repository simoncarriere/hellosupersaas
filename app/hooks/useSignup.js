"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Custom Hooks
import { useAuthContext } from "../hooks/useAuthContext";

// Firebase Imports
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const signup = (email, password) => {
    setError(null);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setLoading(false);
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return { error, loading, signup };
};
