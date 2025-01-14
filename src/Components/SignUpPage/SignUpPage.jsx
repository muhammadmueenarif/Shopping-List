import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import API from '../../api/api';
import Footer from "../Footer/Footer";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post('/users/signup', { email, username, password });
      alert("Signup successful! Please log in.");
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter email"
          />
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter username"
          />
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 pr-10"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">Login</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
