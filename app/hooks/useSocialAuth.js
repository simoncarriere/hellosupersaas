import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Firebase Imports
import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
// Access our auth context dispatch function
import { useAuthContext } from "./useAuthContext";

// Social Providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useSocialAuth = () => {
  const { dispatch } = useAuthContext();

  const router = useRouter();
  // Form Handling
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false); // For Cleanup

  const socialSignup = async (provider) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithRedirect(auth, provider)
        .then((res) => {
          const credential = provider.credentialFromResult(res);
          const token = credential.accessToken;
          // Not getting a response at all (example network connection)
          if (!res) {
            throw new Error("Could not complete signup");
          }
          dispatch({ type: "LOGIN", payload: res.user }).then(() => {
            router.push("/");
            console.log("after social router");
          });

          //   Check for cancellation
          if (!isCancelled) {
            setIsPending(false);
            setError(null);
          }
        })
        // }
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setIsPending(false);
          console.log(provider.credentialFromResult(err));
        });
    } catch (err) {
      //   Example : Email taken or password too short
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
