"use client";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className="btn-primary">
      Logout
    </button>
  );
};

export default Logout;
