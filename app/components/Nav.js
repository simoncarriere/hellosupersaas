"use client";
import { useAuthContext } from "../hooks/useAuthContext";
import Logout from "./Logout";

const Nav = () => {
  const { user, authIsReady } = useAuthContext();

  return (
    authIsReady &&
    (user ? (
      <div>
        <p>Logged in : {user.email}</p>
        <Logout />
      </div>
    ) : (
      <p>Not logged in</p>
    ))
  );
};

export default Nav;
