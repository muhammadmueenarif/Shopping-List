import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("path_to_existing_image.jpg"); // Set your existing image path here
  const [about, setAbout] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log("Profile saved:", { profileImage, about });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
          
          <div className="mb-4 flex flex-col items-center">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-24 w-24 bg-blue-400 rounded-full mb-4" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mb-4">
                No Image
              </div>
            )}
            <label htmlFor="upload-button" className="cursor-pointer">
              <FontAwesomeIcon icon={faCamera} size="2x" className="text-blue-600" />
            </label>
            <input
              id="upload-button"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <label className="block text-gray-700 mb-2">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Tell us about yourself"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
