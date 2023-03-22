"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Custom Hooks
import { useAuthContext } from "../hooks/useAuthContext";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // if (user == null) router.push("/");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}

export default Page;
