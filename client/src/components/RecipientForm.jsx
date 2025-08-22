// import React, { useState } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
// import idli from '../assets/images/idli.jpg';
// import chickenBiriyani from '../assets/images/chicken_biriyani.jpeg';
// import parotta from '../assets/images/parotta.jpg';
// import vegMeals from '../assets/images/vegmeals.jpg';
// import { jwtDecode } from 'jwt-decode';


// // Array of food images
// const foodImages = [idli, chickenBiriyani, parotta, vegMeals];

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

// const center = {
//   lat: 11.0168,
//   lng: 76.9558,
// };

// const RecipientForm = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60',
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     foodItem: '',
//     quantity: '',
//     foodImage: '', 
//   });

//   const [markerPosition, setMarkerPosition] = useState(center); // To track marker position
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let formErrors = {};

//     if (!formData.name) formErrors.name = 'Name is required';
//     if (!formData.email) {
//       formErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       formErrors.email = 'Email is invalid';
//     }
//     if (!formData.address) formErrors.address = 'Address is required';
//     if (!formData.city) formErrors.city = 'City is required';
//     if (!formData.foodItem) formErrors.foodItem = 'Food Item is required';
//     if (!formData.quantity) formErrors.quantity = 'Quantity is required';
//     else if (formData.quantity <= 0) formErrors.quantity = 'Quantity must be greater than zero';

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get the JWT token from localStorage
//       const decoded = jwtDecode(token);
//       const { id } = decoded; // Assuming _id is the user ID in the token

//       const response = await fetch(`http://localhost:5000/api/users/account/${id}`, {
//         headers: {
//           'Authorization': token,  // Pass token in the header
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Populate the form with user data
//         setFormData({
//           ...formData,
//           name: `${data.firstName} ${data.lastName}`,
//           email: data.email,
//           address: data.address,
//           city: data.city || '', // Assuming 'city' field exists
//         });
//       } else {
//         console.error('Failed to fetch user data:', data.message);
//       }
//     } catch (err) {
//       console.error('Error fetching user data:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const response = await fetch('http://localhost:5000/api/requests/create', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });

//         // Clear form data
//         setFormData({
//           name: '',
//           email: '',
//           address: '',
//           city: '',
//           foodItem: '',
//           quantity: '',
//           foodImage: '',
//         });

//         if (response.ok) {
//           toast.success('Request submitted successfully!', {
//             position: "top-center", 
//             autoClose: 3000,
//             hideProgressBar: true,
//             pauseOnHover: true,
//             draggable: true,
//             onClose: () => window.location.reload(), // Page reload after popup disappears
//           });
//         } else {
//           toast.error('Error submitting request.', {
//             position: "top-center", 
//             autoClose: 3000,
//             hideProgressBar: true,
//             pauseOnHover: true,
//             draggable: true,            
//           });
//         }
//       } catch (error) {
//         toast.error('Server error. Try again later.', {
//           position: "top-center", 
//           autoClose: 3000,
//           hideProgressBar: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     }
//   };

//   const handleImageSelect = (image) => {
//     setFormData({ ...formData, foodImage: image });
//     setShowModal(false);
//   };

//   // Function to handle map clicks and update marker position and address
//   const handleMapClick = async (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
//     setMarkerPosition({ lat, lng });

//     // Reverse geocode to get the address
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const address = results[0].formatted_address;
//         setFormData({ ...formData, address });
//       } else {
//         toast.error('Error fetching the address', {
//           position: "top-center", 
//           autoClose: 3000,
//           hideProgressBar: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     });
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps...</div>;

//   return (
//     <div className='rounded-lg max-w-full mx-4 md:mx-10 my-10'>
//       <ToastContainer />
//       {/* Title and description */}
//       <div className="text-center mx-4 md:mx-0 mt-10">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange">Request Food with Zero-Hunger</h2>
//         <p className="mb-6 text-black text-lg md:text-xl mx-36">
//           Requesting food is not just about receiving a meal; it's about ensuring that every individual gets the nourishment they need to thrive. Let’s work together to address hunger and promote community well-being.
//         </p>
//       </div>
//       <div className="bg-white shadow-xl border-2 border-custom-orange rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Request Form</h2>
//         <div className='flex flex-col md:flex-row px-4'>
//           <div className="md:w-1/2 p-4">
//             <div className="bg-gray-200 rounded-lg w-full h-80 md:h-80 flex items-center justify-center">
//               <GoogleMap 
//                 mapContainerStyle={mapContainerStyle} 
//                 zoom={10} 
//                 center={markerPosition}
//                 onClick={handleMapClick}
//               >
//                 <Marker position={markerPosition} />
//               </GoogleMap>
//             </div>
//           </div>

//           {/* Request Form */}
//           <div className="md:w-1/2 p-4">
//             <form className="bg-white" onSubmit={handleSubmit}>
//               {['name', 'email', 'address', 'city', 'foodItem'].map((field) => (
//                 <div className="mb-4" key={field}>
//                   <input
//                     type="text"
//                     name={field}
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors[field] ? 'border-red-500' : ''
//                     }`}
//                   />
//                   {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
//                 </div>
//               ))}
//               <div className="mb-4">
//                 <input
//                   type="number"
//                   name="quantity"
//                   placeholder="Quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                     errors.quantity ? 'border-red-500' : ''
//                   }`}
//                 />
//                 {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
//               </div>

//               {/* Food Image Selection */}
//               <div className="mb-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(true)}
//                   className="bg-custom-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Select Food Image
//                 </button>
//                 {formData.foodImage && (
//                   <div className="mt-4">
//                     <p>Selected Image:</p>
//                     <img src={formData.foodImage} alt="Selected Food" className="w-full h-full rounded" />
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="bg-custom-orange hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Modal for selecting food image */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
//             <h3 className="text-lg font-bold mb-4">Select Food Image</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {foodImages.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Food ${index}`}
//                   className="cursor-pointer rounded-lg"
//                   onClick={() => handleImageSelect(image)}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 bg-custom-orange text-white font-bold py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipientForm;

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
// import idli from '../assets/images/idli.jpg';
// import chickenBiriyani from '../assets/images/chicken_biriyani.jpeg';
// import parotta from '../assets/images/parotta.jpg';
// import vegMeals from '../assets/images/vegmeals.jpg';
// import { jwtDecode } from 'jwt-decode';

// // Array of food images
// const foodImages = [idli, chickenBiriyani, parotta, vegMeals];

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

// const center = {
//   lat: 11.0168,
//   lng: 76.9558,
// };

// const RecipientForm = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60',
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     foodItem: '',
//     quantity: '',
//     foodImage: '', 
//   });

//   const [markerPosition, setMarkerPosition] = useState(center); // To track marker position
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   // Fetch user data when component mounts
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let formErrors = {};

//     if (!formData.name) formErrors.name = 'Name is required';
//     if (!formData.email) {
//       formErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       formErrors.email = 'Email is invalid';
//     }
//     if (!formData.address) formErrors.address = 'Address is required';
//     if (!formData.city) formErrors.city = 'City is required';
//     if (!formData.foodItem) formErrors.foodItem = 'Food Item is required';
//     if (!formData.quantity) formErrors.quantity = 'Quantity is required';
//     else if (formData.quantity <= 0) formErrors.quantity = 'Quantity must be greater than zero';

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get the JWT token from localStorage
//       const decoded = jwtDecode(token);
//       const { id } = decoded; // Assuming _id is the user ID in the token

//       const response = await fetch(`http://localhost:5000/api/users/account/${id}`, {
//         headers: {
//           'Authorization': token,  // Pass token in the header
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Populate the form with user data
//         setFormData({
//           ...formData,
//           name: `${data.firstName} ${data.lastName}`,
//           email: data.email,
//           address: data.address,
//           city: data.city || '', // Assuming 'city' field exists
//         });
//       } else {
//         console.error('Failed to fetch user data:', data.message);
//       }
//     } catch (err) {
//       console.error('Error fetching user data:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const response = await fetch('http://localhost:5000/api/requests/create', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });

//         // Clear form data
//         setFormData({
//           name: '',
//           email: '',
//           address: '',
//           city: '',
//           foodItem: '',
//           quantity: '',
//           foodImage: '',
//         });

//         if (response.ok) {
//           toast.success('Request submitted successfully!', {
//             position: "top-center", 
//             autoClose: 3000,
//             hideProgressBar: true,
//             pauseOnHover: true,
//             draggable: true,
//             onClose: () => window.location.reload(), // Page reload after popup disappears
//           });
//         } else {
//           toast.error('Error submitting request.', {
//             position: "top-center", 
//             autoClose: 3000,
//             hideProgressBar: true,
//             pauseOnHover: true,
//             draggable: true,            
//           });
//         }
//       } catch (error) {
//         toast.error('Server error. Try again later.', {
//           position: "top-center", 
//           autoClose: 3000,
//           hideProgressBar: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     }
//   };

//   const handleImageSelect = (image) => {
//     setFormData({ ...formData, foodImage: image });
//     setShowModal(false);
//   };

//   // Function to handle map clicks and update marker position and address
//   const handleMapClick = async (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
//     setMarkerPosition({ lat, lng });

//     // Reverse geocode to get the address
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const address = results[0].formatted_address;
//         setFormData({ ...formData, address });
//       } else {
//         toast.error('Error fetching the address', {
//           position: "top-center", 
//           autoClose: 3000,
//           hideProgressBar: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     });
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps...</div>;

//   return (
//     <div className='rounded-lg max-w-full mx-4 md:mx-10 my-10'>
//       <ToastContainer />
//       {/* Title and description */}
//       <div className="text-center mx-4 md:mx-0 mt-10">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange">Request Food with Zero-Hunger</h2>
//         <p className="mb-6 text-black text-lg md:text-xl mx-36">
//           Requesting food is not just about receiving a meal; it's about ensuring that every individual gets the nourishment they need to thrive. Let’s work together to address hunger and promote community well-being.
//         </p>
//       </div>
//       <div className="bg-white shadow-xl border-2 border-custom-orange rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Request Form</h2>
//         <div className='flex flex-col md:flex-row px-4'>
//           <div className="md:w-1/2 p-4">
//             <div className="bg-gray-200 rounded-lg w-full h-80 md:h-80 flex items-center justify-center">
//               <GoogleMap 
//                 mapContainerStyle={mapContainerStyle} 
//                 zoom={10} 
//                 center={markerPosition}
//                 onClick={handleMapClick}
//               >
//                 <Marker position={markerPosition} />
//               </GoogleMap>
//             </div>
//           </div>

//           {/* Request Form */}
//           <div className="md:w-1/2 p-4">
//             <form className="bg-white" onSubmit={handleSubmit}>
//               {['name', 'email', 'address', 'city', 'foodItem'].map((field) => (
//                 <div className="mb-4" key={field}>
//                   <input
//                     type="text"
//                     name={field}
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors[field] ? 'border-red-500' : ''
//                     }`}
//                   />
//                   {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
//                 </div>
//               ))}
//               <div className="mb-4">
//                 <input
//                   type="number"
//                   name="quantity"
//                   placeholder="Quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                     errors.quantity ? 'border-red-500' : ''
//                   }`}
//                 />
//                 {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
//               </div>
//               <div className="mb-4">
//                 <button 
//                   type="button" 
//                   className="bg-custom-orange text-white py-2 px-4 rounded focus:outline-none" 
//                   onClick={() => setShowModal(true)}
//                 >
//                   Select Food Image
//                 </button>
//               </div>
//               <button 
//                 type="submit" 
//                 className="bg-custom-orange text-white py-2 px-4 rounded focus:outline-none"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipientForm;

import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 11.0168,
  lng: 76.9558,
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
  });

  const [markerPosition, setMarkerPosition] = useState(center); // Marker position state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data when the form focuses on any field
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      const decoded = jwtDecode(token);
      const { id } = decoded; // Assuming _id is the user ID in the token

      const response = await fetch(`https://zerohunger-wzdk.onrender.com/api/users/account/${id}`, {
        headers: {
          'Authorization': token, // Pass token in the header
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

  // Handle input field focus to fetch data
  const handleFocus = (field) => {
    if (field === 'name' && !formData.name) {
      fetchUserData();
    }
    if (field === 'email' && !formData.email) {
      fetchUserData();
    }
    if (field === 'address' && !formData.address) {
      fetchUserData();
    }
  };

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

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60`
      );
      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        setFormData({ ...formData, address });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      const formDataToSend = {
        ...formData,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      };

      try {
        const response = await axios.post('https://zerohunger-wzdk.onrender.com/api/requests/create', formDataToSend);
        if (response.status === 201 || response.status === 200) {
          toast.success('Request submitted successfully!', {
            position: 'top-center',
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
          });
        } else {
          toast.error('Error submitting request.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
        toast.error('Server error. Please try again later.', {
          position: 'top-center',
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
    <div className='rounded-lg max-w-full mx-4 md:mx-10 my-10' id='recipient'>
      <div className="text-center mx-4 md:mx-0 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange">Request Food</h2>
        <p className="mb-4 text-black text-lg md:text-xl mx-48">
          Let us help provide food for those in need. Submit your request for food items.
        </p>
      </div>
      <div className="bg-white shadow-xl border-2 border-custom-orange rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">Request Food</h2>
        <div className='flex flex-col md:flex-row px-4'>
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
          <div className="md:w-1/2 p-1">
            <form className="bg-white p-6" onSubmit={handleSubmit}>
              {['name', 'email', 'address', 'city', 'foodItem', 'quantity'].map((field) => (
                <div className="mb-4" key={field}>
                  <input
                    type={field === 'quantity' ? 'number' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)} // Fetch user data on focus
                    className={`w-full p-3 border rounded-lg shadow-sm ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <button type="submit" className={`w-full bg-custom-orange text-white p-3 rounded-lg font-bold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};  

export default RecipientForm;
