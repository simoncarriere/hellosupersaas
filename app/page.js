"use client";
import { Inter } from "next/font/google";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
// Components
import Onboarding from "../components/Account/Onboarding";
import Debugger from "../components/Account/Debugger";
import EmailVerifyBanner from "../components/Account/EmailVerifyBanner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, authIsReady } = useAuthContext();

  console.log(user);

  return (
    authIsReady && (
      <div className="flex flex-col gap-4 px-6 mx-auto rounded-md ">
        <div>
          {user ? (
            <>
              {/* Banner will only display for users who have signed up with email and password and have not verified their email. */}
              {user.providerData[0].providerId === "password" &&
                user.emailVerified === false && (
                  <EmailVerifyBanner user={user} />
                )}

              {/* Debugger displays useful user data you have access to */}
              <Debugger user={user} />

              {/* Onboarding will only display for users who are signing in for the first time */}
              {user.metadata.creationTime === user.metadata.lastSignInTime && (
                <Onboarding />
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2 p-6 border rounded-md bg-slate-50 broder-slate-100">
              <p>Unauthenticated</p>
            </div>
          )}
        </div>
      </div>
    )
  );
}
