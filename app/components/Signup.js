"use client";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h1>Create Account</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <button className="btn-disabled" type="disabled">
          Loading...
        </button>
      ) : (
        <button className="btn-primary" type="submit">
          Sign Up
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};
export default SignUp;
