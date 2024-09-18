import React, { useState, useEffect } from 'react';
import '../services/BackgroundAnimation.scss';

const AccountSettings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        const response = await fetch('http://localhost:3000/users/profile', {
          headers: {
            'Authorization': token,  // Pass token in the header
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Populate the form with user data
          setUsername(data.username);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhoneNumber(data.phone);
          setAddress(data.address);
          setProfilePhoto(`http://localhost:3000/uploads/${data.profileImage}`);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      const updatedProfile = {
        username,
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        address,
      };

      const response = await fetch('http://localhost:3000/users/profile', {
        method: 'PUT', // Update user profile
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Pass the token in the header
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        const data = await response.json();
        alert(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile.');
    }
  };

  return (
    <div className='wrapper'>
      <div className="container mx-auto p-8 mt-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Account Settings</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 border-2 border-custom-orange shadow-custom-orange bg-transparent">
          <div className="flex flex-col lg:flex-row border-2 border-custom-orange rounded-lg shadow-lg shadow-custom-orange bg-white">
            {/* Left side - Orange background */}
            <div className="bg-orange-500 w-full lg:w-1/3 p-8 flex flex-col items-center justify-start">
              <div className="relative">
                <h2 className='text-center text-white mb-2'>Profile Picture</h2>
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-2 border-gray-300 shadow-md"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 bg-gray-100 shadow-md">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full lg:w-2/3 p-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ul className="bg-bubbles absolute top-0 left-0 w-full h-full z-10">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default AccountSettings;
