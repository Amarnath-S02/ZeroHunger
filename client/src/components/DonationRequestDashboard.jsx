import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa'; // Import FontAwesome for tick icon

const DonationRequestDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;
      console.log(userEmail)

      try {
        const response = await fetch(`http://localhost:5000/api/donations?status=waiting for approval&email=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${requestId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status: 'initiated', approved: true } : req
          )
        );
        toast.success('Donation approved!');
      } else {
        throw new Error('Failed to approve donation');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className="border-b-2 p-4 flex justify-between items-center"
            >
              <div>
                <p><strong>Food Item:</strong> {request.foodItem}</p>
                <p><strong>Quantity:</strong> {request.quantity}</p>
                <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                <p><strong>Recipient Email:</strong> {request.recipientEmail}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </div>
              <div>
                {request.approved ? (
                  <FaCheckCircle className="text-green-500 animate-approval-success" size={28} /> // Green tick with animation
                ) : (
                  <button
                    className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
                    onClick={() => handleApprove(request._id)}
                  >
                    Approve Donation
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No donation requests available.</p>
        )}
      </div>
    </div>
  );
};

export default DonationRequestDashboard;
