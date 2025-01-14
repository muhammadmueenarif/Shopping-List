import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignUpPage/SignUpPage";
import ProfilePage from './Components/ProfilePage/ProfilePage';
import DetailsPage from './Components/DetailsPage/DetailsPage';
import ShoppingListPage from "./Components/ShoppingListPage/ShoppingListPage";
import Navbar from './Components/Navbar/Navbar'; //for not logged in users
import LoggedInNavbar from './Components/Navbar/LoggedInNavbar'; //for logged-in users

function App() {
  const isLoggedIn = false; // Replace this with your actual login state

  return (
    
    <div className='App'>
      <Router>
      {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/shopping-list" element={<ShoppingListPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
