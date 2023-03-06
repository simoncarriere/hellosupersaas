"use client";
import { useState } from "react";
import { useSignin } from "../hooks/useSignin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, login } = useSignin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h1>Sign In</h1>
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
          Login
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};
export default Login;
