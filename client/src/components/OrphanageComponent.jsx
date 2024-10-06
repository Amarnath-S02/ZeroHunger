import React, { useEffect, useState } from 'react';
import PostOrph from './PostOrph';
import axios from 'axios'; // To make HTTP requests

const OrphanageComponent = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors

  // Fetch orphanages from the backend
  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orphanages/view'); // Make sure your backend route is correct
        setOrphanages(response.data); // Set orphanages data
        setLoading(false); // Loading done
      } catch (err) {
        setError(err.message); // Handle any error
        setLoading(false); // Loading done, but with error
      }
    };

    fetchOrphanages();
  }, []);

  if (loading) {
    return <div>Loading orphanages...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div id="tabpanel-2" role="tabpanel" aria-labelledby="tab-2" className="bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8">
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Orphanages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orphanages.map((orphanage) => (
          <PostOrph
            key={orphanage._id}
            id={orphanage._id} // Pass the orphanage ID to PostOrph
            name={orphanage.name}
            imgSrc={`http://localhost:5000/${orphanage.image.replace(/\\/g, '/')}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OrphanageComponent;
