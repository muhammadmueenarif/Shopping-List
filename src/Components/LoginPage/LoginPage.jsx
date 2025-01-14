import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import API from '../../api/api';
import Footer from "../Footer/Footer";
import { AuthContext } from '../../AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post('/users/login', { email: emailOrUsername, password });
      const { token, userId } = response.data; // Extract token and userId from the response
      localStorage.setItem('token', token); // Store token in localStorage
      localStorage.setItem('userId', userId); // Store userId in localStorage
      login(token); // Call the login function from AuthContext  
      navigate("/shopping-list");
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error logging in");
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
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
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
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex justify-between mt-4 text-sm">
            <a href="/forgot-password" className="text-blue-600">Forgot Password?</a>
            <a href="/signup" className="text-blue-600">Sign Up</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
