import { useState } from "react";
// Custom Hooks
import { useAuthContext } from "./useAuthContext";

// Firebase Imports
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  // Form Handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = (email, password) => {
    setError(null);
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to log in. Wrong email or password.");
        setLoading(false);
      });
  };

  return { error, loading, login };
};
