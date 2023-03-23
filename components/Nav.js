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

  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

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
              <div className="flex items-center justify-between ">
                <p className="mr-4">
                  Hello, {user.displayName || user.email.split("@")[0]}
                </p>
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
