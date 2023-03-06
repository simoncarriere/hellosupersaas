import Image from "next/image";
import { Inter } from "next/font/google";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Nav />
      <SignUp />
      <Login />
    </>
  );
}
