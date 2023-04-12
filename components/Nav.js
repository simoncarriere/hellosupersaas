"use client";
import { useState } from "react";
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

const Nav = () => {
  const { user, authIsReady } = useAuthContext();
  // Manage Models State
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  return (
    authIsReady && (
      <div className="fixed z-20 w-full">
        {!user && (
          <div className="flex items-center gap-x-6 bg-neutral-800 hover:bg-neutral-900 py-4 px-6 sm:px-3.5 justify-center ">
            <p className="text-sm leading-6 text-gray-300">
              <strong className="font-semibold text-gray-100">
                🚀 Early Access Promo
              </strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Be one of the first hundred to join and grab it for $100/year
              {/* <span className="pl-2 font-bold text-orange-200">FIRST100</span> */}
              {/* But we&apos;re excited to show you what we&apos;ve built so far. */}
              {/* <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span> */}
            </p>
          </div>
        )}
        <nav
          aria-label="Top"
          className="flex items-center justify-between w-full p-6 bg-gradient-to-b from-white to-white/80"
        >
          <div className="flex items-center w-40">
            <Link href="/">
              <span className="sr-only">Logo</span>
              <Image
                width={200}
                height={100}
                className="w-40 hover:scale:110"
                src="/supersaas.png"
                alt="supersaas"
              />
            </Link>
          </div>
          {user ? (
            <>
              <div className="flex items-center justify-between gap-4 ">
                <p>Hey, {user.displayName || user.email.split("@")[0]}</p>
                <UserDropdown
                  user={user}
                  showAccountSettings={showAccountSettings}
                  setShowAccountSettings={setShowAccountSettings}
                />
              </div>
              <AccountSettings
                showAccountSettings={showAccountSettings}
                setShowAccountSettings={setShowAccountSettings}
              />
            </>
          ) : (
            <div className="flex ml-10 space-x-4">
              <Login
                btnText="Login"
                setShowForgetPassword={setShowForgetPassword}
              />
              <Signup btnText="Start Building" primaryBtn={false} />
              {showForgetPassword && (
                <ForgetPassword
                  showForgetPassword={showForgetPassword}
                  setShowForgetPassword={setShowForgetPassword}
                />
              )}
            </div>
          )}
        </nav>
      </div>
    )
  );
};

export default Nav;
