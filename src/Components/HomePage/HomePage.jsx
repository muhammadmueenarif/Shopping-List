import React from 'react'
import Navbar from "../Navbar/Navbar";
import ShoppingImg from '../Images/main_shopping.jpeg'
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <div>
    <Navbar />
    <main className="flex flex-col items-center justify-center p-6">
      <img
        src={ShoppingImg}
        alt="Shopping Purpose"
        className="w-1/2 max-w-md cursor-pointer"
      />
      <h1 className="text-2xl font-bold mt-4 text-gray-800">
        Collaborate on Your Shopping List with Ease
      </h1>
    <a href="/signup">
    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
        Get Started
      </button>
    </a>
    </main>
   <Footer/>
  </div>
  )
}

export default HomePage
