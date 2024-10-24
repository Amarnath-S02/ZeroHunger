import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../services/api';
import '../services/MultiStepForm.scss';
import '../services/BackgroundAnimation.scss';
import '../services/map.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps components

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        profileImage: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showMap, setShowMap] = useState(false); // State for showing the map
    const [markerPosition, setMarkerPosition] = useState({ lat: 10.8505, lng: 77.2644 }); // Default location (Tamil Nadu)
    const [mapLoaded, setMapLoaded] = useState(false); // Track if the map has been loaded

    const navigate = useNavigate();
    const totalSteps = 4;
    const mapRef = useRef(null); // Reference for the map

    const handleNext = () => {
        // Validate fields based on current step
        if (currentStep === 1) {
            if (!formData.username || !formData.email || !formData.password) {
                alert("Please fill in all fields.");
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
                alert("Please fill in all fields.");
                return;
            }
        } else if (currentStep === 3) {
            if (!formData.profileImage) {
                alert("Please upload a profile image.");
                return;
            }
        }

        // Proceed to the next step if all validations pass
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'profileImage' && files && files[0]) {
            setFormData({
                ...formData,
                [name]: files[0],
            });
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Function to show the map when focusing on address field
    const handleAddressFocus = () => {
        setShowMap(true); // Show map when the address field is focused
    };

    // Function to hide the map and fill the address field with the selected location
    const handleMapClick = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();
        const geocoder = new window.google.maps.Geocoder();

        // Reverse geocoding to get the address
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setFormData({ ...formData, address: results[0].formatted_address });
                    setShowMap(false); // Hide map after selecting the location
                } else {
                    console.error('No results found');
                }
            } else {
                console.error('Geocoder failed due to: ' + status);
            }
        });

        setMarkerPosition({ lat, lng }); // Update marker position
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });

        try {
            const response = await registerUser(form);
            console.log('User registered successfully:', response.data);
            setSuccessMessage('Account created successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
        }
    };

    return (
        <div className='h-full w-full wrapper'>
            <ul className="bg-bubbles">
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

            {/* Map Modal */}
            {showMap && (
                <div className="map-overlay">
                    <div className="map-dialog">
                        <LoadScript googleMapsApiKey="AIzaSyDtZ8bWsIDpKlq_g3uknsUwFYeYV86Nn60">
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '400px' }}
                                center={markerPosition}
                                zoom={10}
                                onClick={handleMapClick}
                                onLoad={() => setMapLoaded(true)}
                                ref={mapRef}
                            >
                                {/* Marker shows on the selected position */}
                                {mapLoaded && <Marker position={markerPosition} />}
                            </GoogleMap>
                        </LoadScript>
                        <button onClick={() => setShowMap(false)} className="close-map-btn">
                            Close Map
                        </button>
                    </div>
                </div>
            )}

            <div className="form-wizard">
                <div className="steps">
                    <ul>
                        <li className={currentStep >= 1 ? 'active' : ''}>
                            <span>1</span> Create Account
                        </li>
                        <li className={currentStep >= 2 ? 'active' : ''}>
                            <span>2</span> Personal Info
                        </li>
                        <li className={currentStep >= 3 ? 'active' : ''}>
                            <span>3</span> Profile Image
                        </li>
                        <li className={currentStep >= 4 ? 'active' : ''}>
                            <span>4</span> Finish
                        </li>
                    </ul>
                </div>

                <div className="myContainer my-10">
                    {successMessage && (
                        <div className="success-message text-center text-green-500 mb-4">
                            {successMessage}
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="form-container animated active">
                            <h2 className="text-center form-title">Create Account</h2>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group text-center mar-b-0">
                                    <input
                                        type="button"
                                        value="NEXT"
                                        className="btn btn-primary next"
                                        onClick={handleNext}
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="form-container animated active">
                            <h2 className="text-center form-title">Personal Info</h2>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone No."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        onFocus={handleAddressFocus} // Trigger map on focus
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group text-center mar-b-0 flex justify-between items-center">
                                    <input
                                        type="button"
                                        value="BACK"
                                        className="btn btn-secondary back"
                                        onClick={handleBack}
                                    />
                                    <input
                                        type="button"
                                        value="NEXT"
                                        className="btn btn-primary next"
                                        onClick={handleNext}
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="form-container animated active">
                        <h2 className="text-center form-title">Profile Image</h2>
                        <form>
                          <div className="form-group">
                            <input
                              type="file"
                              name="profileImage"
                              onChange={handleChange}
                              className="my-2"
                            />
                            {imagePreview && (
                              <div className="image-preview my-4 flex justify-center">
                                <img
                                  src={imagePreview}
                                  alt="Profile Preview"
                                  className="rounded-full w-32 h-32 object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div className="form-group text-center mar-b-0 flex justify-between items-center">
                            <input
                              type="button"
                              value="BACK"
                              className="btn btn-secondary back"
                              onClick={handleBack}
                            />
                            <input
                              type="button"
                              value="NEXT"
                              className="btn btn-primary next"
                              onClick={handleNext}
                            />
                          </div>
                        </form>
                      </div>
                      
                    )}

                    {currentStep === 4 && (
                        <div className="form-container animated active">
                            <h2 className="text-center form-title">Finish</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
