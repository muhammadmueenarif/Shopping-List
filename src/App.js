import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignUpPage/SignUpPage";
import ProfilePage from './Components/ProfilePage/ProfilePage';
import DetailsPage from './Components/DetailsPage/DetailsPage';
import ShoppingListPage from "./Components/ShoppingListPage/ShoppingListPage";
import Navbar from './Components/Navbar/Navbar';
import LoggedInNavbar from './Components/Navbar/LoggedInNavbar';
import { AuthProvider, AuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute.js'; // Import ProtectedRoute

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className='App'>
      <Router>
        {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;
