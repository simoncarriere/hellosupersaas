import { useState } from "react";
import { useRouter } from "next/navigation";
// Custom Hooks
import { useAuthContext } from "./useAuthContext";

// Firebase Imports
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  // Handle Redirect
  const router = useRouter();
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
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return { error, loading, login };
};
