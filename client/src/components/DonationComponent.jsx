import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { jwtDecode } from "jwt-decode";
// ✅ Correct import (without curly braces)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonationComponent = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donations from the backend
    const fetchDonations = async () => {
      try {
        const response = await fetch('https://zerohunger-wzdk.onrender.com/api/donations/today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDonations(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Decode the JWT token from local storage to get the user's email
  const token = localStorage.getItem('token');
  let userEmail = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.email;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // Handler for when a user clicks "Request Now"
  const handleBuyNow = async (donation) => {
    if (donation.email === userEmail) {
      toast.error('You cannot request your own donation!');
    } else {
      const donationRequest = {
        userEmail,
        donorEmail: donation.email,
        foodItem: donation.foodItem,
        quantity: donation.quantity,
      };

      try {
        const response = await fetch('https://zerohunger-wzdk.onrender.com/api/donations/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donationRequest),
        });

        if (response.ok) {
          // Update the status of the donation to "Completed"
          await fetch(`https://zerohunger-wzdk.onrender.com/api/donations/${donation._id}/complete`, {
            method: 'PUT',
          });

          toast.success('Request sent successfully!');

          // Remove the requested donation from the state
          setDonations((prevDonations) => prevDonations.filter((d) => d._id !== donation._id));
        } else {
          throw new Error('Failed to send request.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to send request.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      id="tabpanel-1"
      role="tabpanel"
      aria-labelledby="tab-1"
      className="bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">
        Donation Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <Post
              key={index}
              name={donation.foodItem}
              quantity={donation.quantity}
              time={donation.time}
              imgSrc={`https://zerohunger-wzdk.onrender.com/${donation.photo}`}
              donationEmail={donation.email}
              onBuyNow={() => handleBuyNow(donation)}
            />
          ))
        ) : (
          <p>No donations available for today.</p>
        )}
      </div>
    </div>
  );
};

export default DonationComponent;
