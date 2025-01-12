import React from 'react'
import KashanMoinLogo from '../Images/Kashan_Moin_Logo.jpeg';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Redirect to home page */}
    <div className="flex items-center cursor-pointer">
      <a href="/">
      <img src={KashanMoinLogo} alt="Kashan Moin Logo" className="h-8 w-8 mr-2 rounded-full" />
      </a>
       <a href="/">
       <span className="text-lg font-bold">Shopping List</span>
       </a> 
    </div>
    <div>
      <a href="/login">
      <button className="px-4 py-2 bg-white text-blue-600 rounded mr-2 hover:bg-blue-200">Login</button>
      </a>
      <a href="/signup">      
        <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-200">Sign Up</button>
      </a>
    </div>
  </nav>
  )
}

export default Navbar
