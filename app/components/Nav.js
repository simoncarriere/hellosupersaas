"use client";
import Link from "next/link";
// Hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
// Components
import Settings from "./Settings";

const Nav = () => {
  const { user, authIsReady } = useAuthContext();
  const { logout } = useLogout();

  return (
    authIsReady && (
      // (user ? (
      <nav
        aria-label="Top"
        className="flex items-center justify-between w-full py-6 "
      >
        <div className="flex items-center">
          <Link href="/">
            <h3>Logo</h3>
            <span className="sr-only">Workflow</span>
            {/* <img
              className="w-auto h-10 "
              src="https://tailwindui.com/img/logos/workflow-mark.svg?"
              alt=""
            /> */}
          </Link>
        </div>
        {user ? (
          <div className="flex items-center ml-10 space-x-4">
            <p>Hello, {user.displayName || user.email.split("@")[0]}</p>
            <Settings
              logout={logout}
              user={user}
              // toggleDarkMode={toggleDarkMode}
              // darkMode={darkMode}
            />
          </div>
        ) : (
          <div className="ml-10 space-x-4">
            <Link href="Login" className="btn-light">
              Log in
            </Link>
            <Link href="Signup" className="btn-dark">
              Sign up
            </Link>
          </div>
        )}
      </nav>
    )
  );
};

export default Nav;
