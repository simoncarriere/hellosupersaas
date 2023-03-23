"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
// Components
import Onboarding from "../components/Account/Onboarding";
import Debugger from "../components/Account/Debugger";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, authIsReady } = useAuthContext();

  return (
    authIsReady && (
      <div className="flex flex-col gap-4 p-6 mx-auto rounded-md ">
        <div>
          {user ? (
            <>
              <Debugger user={user} />
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
