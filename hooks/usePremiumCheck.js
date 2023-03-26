"use client";
import { useAuthContext } from "../hooks/useAuthContext";
// Firebase
import { db } from "../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const userPremiumCheck = () => {
  const { dispatch, user, userIsPremium } = useAuthContext();

  const checkForPremium = () => {
    if (user && !userIsPremium) {
      // Check if user is premium
      const authUserDocuments = collection(
        db,
        "users",
        user.uid,
        "subscriptions"
      );
      const q = query(
        authUserDocuments,
        where("status", "in", ["trialing", "active"])
      );
      onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const subscription = snapshot.docs[0].data();
          if (subscription.status === "active") {
            // setUserIsPremium(true);
            dispatch({ type: "SET_USER_IS_PREMIUM" });
          } else {
            console.log("Subscription Expired");
          }
        }
      });
    }
  };

  return { checkForPremium };
};
