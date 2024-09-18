import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import registerUser from '../services/api';
import '../services/MultiStepForm.scss'; 
import '../services/BackgroundAnimation.scss';

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
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const navigate = useNavigate(); // Initialize useNavigate
    const totalSteps = 4;

    const handleNext = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });

        try {
            const response = await registerUser(form);
            console.log('User registered successfully:', response.data);
            setSuccessMessage('Account created successfully!'); // Set success message
            setTimeout(() => {
                navigate('/login'); // Navigate to login page after a short delay
            }, 2000); // Delay for 2 seconds to display the message
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
                                        className='my-2'
                                    />
                                </div>
                                <div className="form-group text-center mar-b-0 flex justify-between items-center">
                                    <input
                                        type="button"
                                        value="BACK"
                                        className="btn btn-default back px-4 py-2 my-2"
                                        onClick={handleBack}
                                    />
                                    <input
                                        type="button"
                                        value="NEXT"
                                        className="btn btn-primary next px-4 py-2 my-2"
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
                                {imagePreview && (
                                    <div className="image-preview mb-4">
                                        <img
                                            src={imagePreview}
                                            alt="Profile Preview"
                                            className="w-32 h-32 object-cover rounded-full mx-auto"
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <input
                                        type="file"
                                        name="profileImage"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md my-2"
                                    />
                                </div>
                                <div className="form-group text-center mar-b-0 flex justify-between items-center">
                                    <input
                                        type="button"
                                        value="BACK"
                                        className="btn btn-default back px-4 py-2 my-2"
                                        onClick={handleBack}
                                    />
                                    <input
                                        type="button"
                                        value="NEXT"
                                        className="btn btn-primary next px-4 py-2 my-2"
                                        onClick={handleNext}
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="form-container animated active my-auto">
                            <h2 className="text-center form-title">Finish</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h3 className="text-center">Thanks for joining the community</h3>
                                    <p className="text-center">
                                        Made by <a href="#" target="_blank" rel="noopener noreferrer">@Zero Hunger</a>
                                    </p>
                                </div>
                                <div className="form-group text-center mar-b-0 flex justify-between items-center">
                                    <input
                                        type="button"
                                        value="BACK"
                                        className="btn btn-default back px-4 py-2 my-2"
                                        onClick={handleBack}
                                    />
                                    <input
                                        type="submit"
                                        value="FINISH"
                                        className="btn btn-primary next px-4 py-2 my-2"
                                    />
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
