import React, { useState, useEffect } from 'react';
import '../services/BackgroundAnimation.scss';
import { jwtDecode } from 'jwt-decode';

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
        const decoded = jwtDecode(token);
        const { id } = decoded; // Assuming _id is the user ID in the token

        const response = await fetch(`http://localhost:5000/api/users/account/${id}`, {
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
          setProfilePhoto(`http://localhost:5000/uploads/${data.profileImage}`);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Update user data in the backend
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const { id } = decoded;

      const response = await fetch(`http://localhost:5000/api/users/account/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: phoneNumber,
          address,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        console.error('Failed to update user data:', data.message);
      }
    } catch (err) {
      console.error('Error updating user data:', err);
    }
  };

  return (
    <div className='wrapper'>
      <div className="container mx-auto p-8 mt-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Account Settings</h2>
        <form onSubmit={handleUpdate} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 border-2 border-custom-orange shadow-custom-orange bg-transparent">
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
                  readOnly // Make it read-only
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
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
                  onChange={(e) => setFirstName(e.target.value)} // Allow editing
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
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
                  onChange={(e) => setLastName(e.target.value)} // Allow editing
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
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
                  readOnly // Make it read-only
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
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
                  onChange={(e) => setPhoneNumber(e.target.value)} // Allow editing
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
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
                  onChange={(e) => setAddress(e.target.value)} // Allow editing
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ cursor: 'text' }} // Ensure the text cursor appears
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-400"
              >
                Update Profile
              </button>
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
      </ul>
    </div>
  );
};

export default AccountSettings;
