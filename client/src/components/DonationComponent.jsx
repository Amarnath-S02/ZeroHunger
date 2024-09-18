import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

const DonationComponent = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donations from the backend
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donations/today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="tabpanel-1" role="tabpanel" aria-labelledby="tab-1" className='bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8'>
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Donation Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <Post
              key={index}
              name={donation.foodItem}
              item={donation.quantity}
              time={donation.time}
              imgSrc={`http://localhost:5000/${donation.photo}`}
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
