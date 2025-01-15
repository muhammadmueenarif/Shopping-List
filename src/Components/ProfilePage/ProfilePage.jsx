import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'; // Import AuthContext
import API from '../../api/api'; // Import the axios instance
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null); // Set your existing image path here
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingImage, setEditingImage] = useState(false); // State for editing profile image
  const [editingBio, setEditingBio] = useState(false); // State for editing bio

  useEffect(() => { // Fetch user profile data when the component mounts 
    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Get the userId from localStorage

        if (!token || !userId) {
          throw new Error("Token or userId is missing");
        }

        // Send both token and userId in headers
        const response = await API.get('/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'User-Id': userId // Add the userId in the headers 
            },
          });

        console.log(response.data);  // Add this line to inspect the response data
        const { profileImage, about } = response.data;
        setProfileImage(profileImage);
        setAbout(about);
      } catch (err) {
        console.error(err);
        setError(err.response ? err.response.data.error : "Error fetching profile data");
      }
    };
    fetchProfile();
  }, []);

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

  const handleSaveImage = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    const userId = localStorage.getItem('userId'); // Ensure you have userId stored in localStorage 

    formData.append('userId', userId);
    formData.append('about', about);

    if (profileImage && profileImage.startsWith('data:image')) {
      const blob = await (await fetch(profileImage)).blob();
      formData.append('profileImage', new File([blob], 'profileImage.png',
        { type: blob.type }));
    } else if (profileImage) { 
      formData.append('profileImage', profileImage); 
    } 

    try {
      const token = localStorage.getItem('token');
      const response = await API.post('/users/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Profile image saved:", response.data);
      alert("Profile image updated successfully!");
      setEditingImage(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error updating profile image");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBio = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append('about', about);
    const userId = localStorage.getItem('userId'); // Ensure you have userId stored in localStorage 
    formData.append('userId', userId);

    try {
      const token = localStorage.getItem('token');
      const response = await API.post('/users/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Bio saved:", response.data);
      alert("Bio updated successfully!");
      setEditingBio(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error updating bio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4 flex flex-col items-center"> {profileImage ? (
          <img src={profileImage}
          alt="Profile" className="h-24 w-24 bg-cover bg-blue-400 rounded-full mb-4" />)

          : (<div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mb-4">
            No Image </div>
          )}
          <label htmlFor="upload-button" className="cursor-pointer">
            <FontAwesomeIcon icon={faCamera} size="2x" className="text-blue-600" />
          </label>
          <input id="upload-button" type="file" accept="image/*" onChange={handleImageChange}
            className="hidden" /> {
            editingImage ? (<button onClick={handleSaveImage}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}
              disabled={loading}> {
                loading ? "Saving..." : "Save Image"}
            </button>)
              : (
                <button onClick={() => setEditingImage(true)
                }
                  className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}> Edit Image
                </button>
              )}
        </div>
        <label className="block text-gray-700 mb-2">About</label>
        <textarea value={about} onChange={(e) => setAbout(e.target.value)}
          className="w-full border rounded p-2 mb-4" placeholder="Tell us about yourself"
          readOnly={!editingBio} />
        {editingBio ? (<button onClick={handleSaveBio}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`} disabled={loading}>
          {loading ? "Saving..." : "Save Bio"}
        </button>)
          : (
            <button onClick={() => setEditingBio(true)}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}> Edit Bio </button>
          )} {
          error && <p className="text-red-500 text-sm mt-4">{error}</p>
        }
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
