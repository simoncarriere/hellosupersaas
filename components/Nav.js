"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
// Components
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ForgetPassword from "./Auth/ForgetPassword";
import UserDropdown from "./Account/UserDropdown";
import AccountSettings from "./Account/AccountSettings";
import SendToCheckout from "./Account/SendToCheckout";
// Firebase
import { db } from "../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { httpsCallable, getFunctions } from "firebase/functions";

const Nav = () => {
  const { user, dispatch, authIsReady, userIsPremium } = useAuthContext();
  // Manage Model State
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  // ☑️ Move to Context
  // const [userIsPremium, setUserIsPremium] = useState(false);
  const [userPortalLink, setUserPortalLink] = useState(null);

  // Open Checkout Session
  useEffect(() => {
    if (user && !userIsPremium) {
      // Check if user is premium
      // userIsPremium
      // setUserIsPremium(false); // Reset User Status
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
        if (snapshot.empty) {
          // Show products
          console.log("NO SUBSCRIPTIONS FOUND");
        } else {
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
  }, [user]);

  // Open User's customer portal (When user already has a subscription)
  const sendToCustomerPortal = async () => {
    const functions = getFunctions();
    const createPortalLink = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    try {
      createPortalLink({ returnUrl: window.location.origin })
        .then((result) => {
          const data = result.data;
          window.location.assign(data.url);
          setUserPortalLink(data.url);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userPortalLink);

  return (
    authIsReady && (
      <>
        <nav
          aria-label="Top"
          className="flex items-center justify-between w-full p-6 bg-white"
        >
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Logo</span>
              <Image
                width={100}
                height={100}
                src="/saasy-blue.png"
                alt="Sassy"
              />
            </Link>
          </div>
          {user ? (
            <>
              <div className="flex items-center justify-between gap-4 ">
                {userIsPremium ? (
                  <button
                    onClick={sendToCustomerPortal}
                    className="btn-outline"
                  >
                    Customer Portal
                  </button>
                ) : (
                  <SendToCheckout user={user} />
                )}
                <p>Hello, {user.displayName || user.email.split("@")[0]}</p>
                <UserDropdown
                  user={user}
                  showAccountSettings={showAccountSettings}
                  setShowAccountSettings={setShowAccountSettings}
                />
              </div>
            </>
          ) : (
            <div className="flex ml-10 space-x-4">
              <Login
                btnText="Login"
                setShowForgetPassword={setShowForgetPassword}
              />
              <Signup btnText="Sign Up" />
              {showForgetPassword && (
                <ForgetPassword
                  showForgetPassword={showForgetPassword}
                  setShowForgetPassword={setShowForgetPassword}
                />
              )}
            </div>
          )}
        </nav>
        {/* Modal Components - sepereated to prevent styling */}
        {user && (
          <AccountSettings
            showAccountSettings={showAccountSettings}
            setShowAccountSettings={setShowAccountSettings}
          />
        )}
      </>
    )
  );
};

export default Nav;
