import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignUpPage/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingListPage from "./Components/ShoppingListPage/ShoppingListPage";

function App() {
  return (
    
    <div className='App'>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/shopping-list" element={<ShoppingListPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
