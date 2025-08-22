import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make API calls
import PostReq from './PostReq'; // Adjust the import path based on your project structure
import { toast } from 'react-toastify'; // For toast notifications
import { jwtDecode } from 'jwt-decode'; // Correct import for decoding JWT token
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const RequestComponent = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // To handle error states

  // Extract the user email from JWT token stored in local storage
  const token = localStorage.getItem('token');
  let userEmail = '';

  if (token) {
    const decoded = jwtDecode(token);
    userEmail = decoded.email;
  }

  useEffect(() => {
    // Fetch the requests for today's date
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://zerohunger-wzdk.onrender.com/api/requests/today'); // Adjust the URL as per your backend
        setRequests(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle the Donate Now button click
  const handleDonateClick = async (request) => {
    const requestEmail = request.email;

    console.log(userEmail)
    console.log(requestEmail)

    if (userEmail === requestEmail) {
      // User cannot donate to their own request
      toast.error("You cannot donate to your own request", {
        position: 'top-right',
      });
    } else {
      const donationData = {
        userEmail: userEmail,
        requestEmail: requestEmail,
        foodItem: request.foodItem,
        quantity: request.quantity,
      };
      console.log(donationData)

      try {
        // Send the donation request
        const response = await axios.post('https://zerohunger-wzdk.onrender.com/api/requests/initiate', donationData);

        if (response.status === 201) {
          // Update the status of the donation to "Completed"
          await axios.put(`https://zerohunger-wzdk.onrender.com/api/requests/${request._id}/complete`);

          toast.success("Thank you for donating!", {
            position: 'top-right',
          });

          // Optionally remove the requested donation from the state
          setRequests((prevRequests) => prevRequests.filter((req) => req._id !== request._id));
        } else {
          toast.error('Failed to send donation request.', {
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while processing your donation.', {
          position: 'top-right',
        });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="tabpanel-2" role="tabpanel" aria-labelledby="tab-2" className="bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8">
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Today's Request Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <PostReq
              key={index}
              name={request.foodItem} // Food item name
              quantity={request.quantity} // Quantity requested
              time={request.time} // Time of request
              email={request.email} // Email of the requestor
              onClick={() => handleDonateClick(request)} // Pass the handler to PostReq with request
            />
          ))
        ) : (
          <div>No requests for today.</div>
        )}
      </div>
    </div>
  );
};

export default RequestComponent;
