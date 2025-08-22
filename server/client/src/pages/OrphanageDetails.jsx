import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT
import { FaPhoneAlt, FaEnvelope, FaUtensils, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import '../services/BackgroundAnimation.scss';

const OrphanageDetails = () => {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationData, setDonationData] = useState({
    foodName: '',
    quantity: '',
    donationDate: '',
    donationTime: '',
  });

  useEffect(() => {
    const fetchOrphanage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orphanages/${id}`);
        setOrphanage(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrphanage();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { foodName, quantity, donationDate, donationTime } = donationData;

    try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');
        console.log("JWT Token:", token); // Check if token is retrieved

        if (!token) {
            toast.error('User not logged in');
            return;
        }

        // Decode the JWT token to extract the user ID
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Log the entire decoded JWT

        const { id: userId, email: userEmail } = decoded; // Extract User ID and Email
        console.log("Extracted User ID:", userId);
        console.log("Extracted User Email:", userEmail); // Log the extracted User Email
        // Check extracted userId

        // Convert donationDate to an ISO string
        const formattedDonationDate = formatDate(donationDate); // Formatting the date to ISO

        console.log("Submitting Donation with Data:", {
          userId,
          orphanageName: orphanage.name,
          orphanageAddress: orphanage.address,
          orphanageEmail: orphanage.email,
          foodItem: foodName,
          quantity,
          donationDate: formattedDonationDate, // Send formatted date,
          donationTime,
      });

        // Send the donation data to the backend
        const response = await axios.post(
            'http://localhost:5000/api/orphanages/submit',
            {
                userId,
                orphanageName: orphanage.name,
                orphanageAddress: orphanage.address,
                orphanageEmail: orphanage.email,
                foodItem: foodName,
                quantity,
                donationDate: formattedDonationDate,
                donationTime,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log("Response from Donation Submission:", response.data);
        toast.success('Donation submitted successfully!');
        setDonationData({ foodName: '', quantity: '', donationDate: '', donationTime: '' },100);
    } catch (error) {
        console.error('Error submitting donation:', error);
        toast.error(<div><FaExclamationCircle className="inline mr-2" /> Error submitting donation: {error.message}</div>);
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!orphanage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">No orphanage found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Orphanage Image with Name and Address Overlay */}
      <div className="relative w-full h-96 bg-gradient-to-t from-orange-600 to-orange-400">
        <img
          src={`http://localhost:5000/${orphanage.image.replace(/\\/g, '/')}`}
          alt={orphanage.name}
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30">
          <h2 className="text-5xl font-bold">{orphanage.name}</h2>
          <p className="text-lg mt-2">{orphanage.address}</p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Orphanage Details */}
          <motion.div
            className="bg-white shadow-xl p-10 rounded-lg flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-custom-orange">Orphanage Information</h3>
            <p className="text-gray-700 mb-4 text-justify">{orphanage.description || "No description available."}</p>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-custom-orange mr-3" />
              <span className="text-lg text-gray-800">{orphanage.phone}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-custom-orange mr-3" />
              <span className="text-lg text-gray-800">{orphanage.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-custom-orange">Thank you for your support!</span>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            className="bg-white shadow-xl p-6 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-custom-orange">Make a Donation</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="foodName">Food Name</label>
                  <input
                    type="text"
                    name="foodName"
                    value={donationData.foodName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    required
                    placeholder="Enter food name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={donationData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    required
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="donationDate">Donation Date</label>
                  <input
                    type="date"
                    name="donationDate"
                    value={donationData.donationDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="donationTime">Donation Time</label>
                  <select
                    name="donationTime"
                    value={donationData.donationTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 px-6 py-3 bg-custom-orange hover:bg-custom-orange transition duration-300 rounded-lg font-semibold shadow-md transform hover:scale-105 flex items-center text-white"
              >
                <FaUtensils className="mr-2" />
                Submit Donation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageDetails;
