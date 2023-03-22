"use client";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useAuthContext } from "./hooks/useAuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, authIsReady } = useAuthContext();
  return (
    authIsReady && (
      <>
        <h1>Landing Page</h1>
        <p>
          {user
            ? `Hello, ${user.displayName || user.email.split("@")[0]}`
            : "Unauthenticated"}
        </p>
      </>
    )
  );
}
