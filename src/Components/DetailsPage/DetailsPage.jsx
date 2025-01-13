import React from 'react';
import Footer from '../Footer/Footer';
const DetailsPage = () => {
  return (
   <div>
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Details</h2>
        <p className="text-gray-700">This is the details page where you can view detailed information about your account.</p>
        {/* Add detailed information here */}
      </div>
    </div>

    <Footer />
   </div>
  );
};

export default DetailsPage;
