import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const DonorForm = () => {
  // Loading Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60', // Use your key
  });

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    foodItem: '',
    quantity: '',
    image: null,
  });

  // State to manage errors and submission
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file drop for image upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Set up Dropzone for image input
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  // Validation for form fields
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

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('foodItem', formData.foodItem);
      formDataToSend.append('quantity', formData.quantity);
      if (formData.image) {
        formDataToSend.append('photo', formData.image);
      }

      try {
        const response = await axios.post('http://localhost:5000/api/donors', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        if (response.status === 201 || response.status === 200) {
          toast.success('Donation initiated successfully!', {
            position: "top-center", 
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => window.location.reload(), // Page reload after popup disappears
          });
      
          // Clear form after successful submission
          setFormData({
            name: '',
            email: '',
            address: '',
            city: '',
            foodItem: '',
            quantity: '',
            image: null,
          });
          setImagePreview(null);
        } else {
          toast.error('Error initiating donation.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
        toast.error('Server error. Please try again later.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Error handling for Google Maps
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className='rounded-lg max-w-full mx-4 md:mx-10 my-10' id='donor'>
      <div className="text-center mx-4 md:mx-0 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange">Donate with Zero-Hunger</h2>
        <p className="mb-4 text-black text-lg md:text-xl mx-48">
          Food donation is not just about filling empty stomachs, it's about nourishing hope, feeding compassion, and cultivating a brighter future for all.
        </p>
      </div>
      <div className="bg-white shadow-xl border-2 border-custom-orange rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Donate Food</h2>
        <div className='flex flex-col md:flex-row px-4'>
          <div className="md:w-1/2 p-1">
            <form className="bg-white p-6" onSubmit={handleSubmit}>
              {['name', 'email', 'address', 'city', 'foodItem'].map((field) => (
                <div className="mb-4" key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-custom-orange focus:border-transparent transition duration-300 ease-in-out ${
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

              <div {...getRootProps({ className: 'dropzone border-dashed border-2 border-gray-300 py-4 mb-4 text-center' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
              </div>
              {imagePreview && (
                <div className="mb-4">
                  <img src={imagePreview} alt="Preview" className="w-full h-auto" />
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-custom-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
          <div className="md:w-1/2 py-8 pr-6">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
              <Marker position={center} />
            </GoogleMap>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DonorForm;
