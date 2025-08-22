import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import 'react-toastify/dist/ReactToastify.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 11.0168,
  lng: 76.9558,
};

const DonorForm = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60', // Use your key
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    foodItem: '',
    quantity: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

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

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60`
      );
      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        setFormData({ ...formData, address });
        setSelectedAddress(address);
      } else {
        toast.error('Unable to retrieve address.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    getAddressFromLatLng(lat, lng);
  };

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
        setFormData({
          ...formData,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          address: data.address,
          city: data.city || '', // Assuming 'city' field exists
        });
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleFocus = (field) => {
    if (field === 'name' && !formData.name) {
      fetchUserData(); // Fetch user data when focusing on the name field
    }
    if (field === 'email' && !formData.email) {
      fetchUserData(); // Fetch user data when focusing on the email field
    }
    if (field === 'address' && !formData.address) {
      fetchUserData(); // Fetch user data when focusing on the address field
    }
  };

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
            onClose: () => window.location.reload(),
          });
      
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
          setSelectedAddress('');
          setMarkerPosition(center);
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
              {/* Rearranged input fields */}
              {['name', 'email', 'address', 'city', 'foodItem', 'quantity'].map((field) => (
                <div className="mb-4" key={field}>
                  <input
                    type={field === 'quantity' ? 'number' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)} // Call handleFocus on focus
                    className={`w-full p-3 border rounded-lg shadow-sm ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-400 p-6 rounded-lg mb-4' })}>
                <input {...getInputProps()} />
                <p className="text-gray-600">Drag and drop an image here, or click to select one</p>
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />}
              </div>
              <button type="submit" className={`w-full bg-custom-orange text-white p-3 rounded-lg font-bold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Donation'}
              </button>
            </form>
          </div>
          <div className="md:w-1/2 p-1">
            <div className="h-96 p-6">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DonorForm;
