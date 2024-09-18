import React, { useState } from 'react';
import axios from 'axios';
import '../services/BackgroundAnimation.scss'; // Ensure this SCSS file contains the necessary styles

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        setSuccess('');

        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

            // Handle successful login
            localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/'; // Redirect to home page
            }, 2000);
        } catch (err) {
            // Handle errors
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className='wrapper relative h-screen w-full flex items-center justify-center'>
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
                <li></li>
            </ul>

            <div className="relative bg-white shadow-md sm:rounded-lg text-left p-8 w-full max-w-md z-20">
                <div className="text-center mb-6">
                    <span className="text-2xl font-light">Login to your account</span>
                </div>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border w-full px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                    <label className="block font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border w-full px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                        >
                            Login
                        </button>
                        <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;