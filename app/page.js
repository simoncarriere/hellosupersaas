"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
// Components
import Onboarding from "../components/Account/Onboarding";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, authIsReady } = useAuthContext();

  return (
    authIsReady && (
      <div className="flex flex-col items-center justify-center gap-4 py-8 mx-auto rounded-md ">
        <div>
          {user ? (
            <>
              <p>displayName: {user.displayName}</p>
              <p>Email : {user.email}</p>
              <p>UID : {user.uid}</p>
              <p>Verified : {user.emailVerified ? "True" : "False"}</p>
              <p>
                photoURL: {user.photoURL ? user.photoURL.slice(0, 100) : "N/A"}
              </p>
              <p>Creation Time: {user.metadata.creationTime}</p>
              <p>Login Time: {user.metadata.lastSignInTime}</p>

              <p>AuthProvider: {user.providerData[0].providerId}</p>
              {user.metadata.creationTime === user.metadata.lastSignInTime && (
                <Onboarding />
              )}
            </>
          ) : (
            <p>Unauthenticated</p>
          )}
        </div>
      </div>
    )
  );
}
