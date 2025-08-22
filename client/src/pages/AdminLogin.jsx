import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add navigation to the dashboard on success
import background from '../assets/images/adminDonate.jpg';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zerohunger-wzdk.onrender.com/admin/login', { username, password });
      if (response.status === 200) {
        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        // Navigate to admin dashboard or home page upon successful login
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // Handle login error (e.g., incorrect username/password)
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img src={background} alt="Welcome" className="h-96 mr-14" />
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-sm w-full z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
