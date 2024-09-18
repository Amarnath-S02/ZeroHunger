import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make API calls
import Post from './Post'; // Adjust the import path based on your project structure

const RequestComponent = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // To handle error states

  useEffect(() => {
    // Fetch the requests for today's date
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests/today'); // Adjust the URL as per your backend
        setRequests(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="tabpanel-2" role="tabpanel" aria-labelledby="tab-2" className='bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8'>
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Request Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <Post
              key={index}
              name={request.foodItem}
              item={request.quantity} // Assuming `foodItem` is the item being requested
              time={request.requestTime} // AM/PM format
              imgSrc={request.foodImage} // Assuming `foodImage` contains the image URL
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
