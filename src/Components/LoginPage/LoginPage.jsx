import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginPage = () => {

const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login logic and success login
    setTimeout(() => {
      if (!emailOrUsername || !password) {
        setError("All fields are required.");
        setLoading(false);
      } else {
        console.log("Logged in with", emailOrUsername, password);
        navigate("/shopping-list"); // Redirect to ShoppingListPage
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <label className="block text-gray-700 mb-2">Email/Username</label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter email or username"
        />
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <a href="/forgot-password" className="text-blue-600">
            Forgot Password?
          </a>
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
