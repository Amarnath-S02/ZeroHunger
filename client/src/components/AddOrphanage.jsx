import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const AddOrphanage = () => {
  const [orphanage, setOrphanage] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '', // Add description to state
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrphanage({ ...orphanage, [name]: value });
  };

  const handleImageChange = (e) => {
    setOrphanage({ ...orphanage, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!orphanage.image) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', orphanage.name);
    formData.append('email', orphanage.email);
    formData.append('phone', orphanage.phone);
    formData.append('address', orphanage.address);
    formData.append('description', orphanage.description); // Add description to FormData
    formData.append('image', orphanage.image);

    try {
      await axios.post('https://zerohunger-wzdk.onrender.com/api/orphanages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Orphanage added successfully!');
      // Clear form after successful submission
      setOrphanage({
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '', // Reset description field
        image: null,
      });
    } catch (error) {
      toast.error('Error adding orphanage. Please try again.');
      console.error('Error adding orphanage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Add ToastContainer to render notifications */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Orphanage</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orphanage Name */}
          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Orphanage Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={orphanage.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={orphanage.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={orphanage.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={orphanage.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              rows="2"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={orphanage.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Orphanage Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="mt-1 block w-full text-gray-500 border border-gray-300 p-3 rounded-md shadow-sm"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            >
              Add Orphanage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrphanage;
