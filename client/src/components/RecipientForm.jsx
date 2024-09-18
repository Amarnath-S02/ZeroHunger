import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';  // Popup Library
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import idli from '../assets/images/idli.jpg';
import chickenBiriyani from '../assets/images/chicken_biriyani.jpeg';
import parotta from '../assets/images/parotta.jpg';
import vegMeals from '../assets/images/vegmeals.jpg';

const foodImages = [idli, chickenBiriyani, parotta, vegMeals];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const RecipientForm = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    foodItem: '',
    quantity: '',
    foodImage: '', 
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.city) formErrors.city = 'City is required';
    if (!formData.foodItem) formErrors.foodItem = 'Food Item is required';
    if (!formData.quantity) formErrors.quantity = 'Quantity is required';
    else if (formData.quantity <= 0) formErrors.quantity = 'Quantity must be greater than zero';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/api/requests/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        // Clear form data
        setFormData({
          name: '',
          email: '',
          address: '',
          city: '',
          foodItem: '',
          quantity: '',
          foodImage: '',
        });
  
        if (response.ok) {
          toast.success('Request submitted successfully!', { position: "top-center" });
        } else {
          toast.error('Error submitting request.', { position: "top-center" });
        }
      } catch (error) {
        toast.error('Server error. Try again later.', { position: "top-center" });
      }
    }
  };

  const handleImageSelect = (image) => {
    setFormData({ ...formData, foodImage: image });
    setShowModal(false);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className='rounded-lg max-w-full mx-4 md:mx-10 my-10'>
      <ToastContainer />
      {/* Title and description */}
      <div className="text-center mx-4 md:mx-0 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange">Request Food with Zero-Hunger</h2>
        <p className="mb-6 text-black text-lg md:text-xl mx-36">
          Requesting food is not just about receiving a meal; it's about ensuring that every individual gets the nourishment they need to thrive. Let’s work together to address hunger and promote community well-being.
        </p>
      </div>
      <div className="bg-white shadow-xl border-2 border-custom-orange rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Request Form</h2>
        <div className='flex flex-col md:flex-row px-4'>
          <div className="md:w-1/2 p-4">
            <div className="bg-gray-200 rounded-lg w-full h-80 md:h-80 flex items-center justify-center">
              <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
                <Marker position={center} />
              </GoogleMap>
            </div>
          </div>

          {/* Request Form */}
          <div className="md:w-1/2 p-4">
            <form className="bg-white" onSubmit={handleSubmit}>
              {['name', 'email', 'address', 'city', 'foodItem'].map((field) => (
                <div className="mb-4" key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors[field] ? 'border-red-500' : ''
                    }`}
                  />
                  {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
                </div>
              ))}
              <div className="mb-4">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.quantity ? 'border-red-500' : ''
                  }`}
                />
                {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
              </div>

              {/* Food Image Selection */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="bg-custom-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Select Food Image
                </button>
                {formData.foodImage && (
                  <div className="mt-4">
                    <p>Selected Image:</p>
                    <img src={formData.foodImage} alt="Selected Food" className="w-full h-full rounded" />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-custom-orange hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Select a Food Image</h2>
            <div className="grid grid-cols-2 gap-4">
              {foodImages.map((image, index) => (
                <div key={index} className="cursor-pointer" onClick={() => handleImageSelect(image)}>
                  <img src={image} alt={`Food ${index + 1}`} className="w-32 h-32 object-cover rounded" />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientForm;
