// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { FaSpinner, FaCalendarAlt, FaClock, FaBox, FaCheckCircle, FaClipboardList, FaTimes } from 'react-icons/fa';
// import { MdFastfood } from 'react-icons/md';


// const DonationsDashboard = () => {
//   const [donations, setDonations] = useState([]);
//   const [selectedDonation, setSelectedDonation] = useState(null); // State for selected donation
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewDetails, setViewDetails] = useState(false); // State for modal visibility

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (token) {
//           const decodedToken = jwtDecode(token);
//           const donorEmail = decodedToken.email;

//           const response = await fetch(`http://localhost:5000/api/donations/completed?donorEmail=${donorEmail}`);
//           const data = await response.json();

//           const sortedDonations = data.sort((a, b) => {
//             const dateA = new Date(`${a.donationDate}T${a.donationTime}`);
//             const dateB = new Date(`${b.donationDate}T${b.donationTime}`);
//             return dateB - dateA;
//           });

//           setDonations(sortedDonations);
//         }
//       } catch (error) {
//         console.error('Error fetching completed donations:', error);
//         setError('Failed to load donations.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-blue-600" /></div>;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   // Handle clicking on a donation to view details
//   const handleViewDetails = (donation) => {
//     setSelectedDonation(donation);
//     setViewDetails(true);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-3xl font-bold mb-6 text-center">Completed Donations</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
//         {donations.length > 0 ? (
//           donations.map((donation) => (
//             <div
//               key={donation._id}
//               className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//               onClick={() => handleViewDetails(donation)} // Show details on click
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2 flex items-center">
//                     <MdFastfood className="mr-2 text-yellow-500" /> {donation.foodItem}
//                   </h3>
//                   <p className="text-gray-600 flex items-center mb-2">
//                     <FaBox className="mr-2" /> <strong>Quantity:</strong> {donation.quantity}
//                   </p>
//                   <p className="text-gray-600 flex items-center mb-2">
//                     <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {donation.donationDate}
//                   </p>
//                   <p className="text-gray-600 flex items-center mb-2">
//                     <FaClock className="mr-2" /> <strong>Time:</strong> {donation.donationTime}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
//                     <FaCheckCircle className="mr-1" /> {donation.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
//             No completed donations available.
//           </p>
//         )}
//       </div>

//       {/* Modal for showing donation details */}
//       {viewDetails && selectedDonation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl relative animate-fade-in">
//             <button
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//               onClick={() => setViewDetails(false)} // Close modal
//             >
//               <FaTimes size={20} />
//             </button>
//             <h3 className="text-2xl font-bold mb-6 text-center text-indigo-500">Donation Details</h3>

//             <div className="flex items-center mb-4 space-x-4">
//               <MdFastfood size={32} className="text-green-500" />
//               <span className="font-bold text-lg">Food Item:</span>
//               <p className="text-lg">{selectedDonation.foodItem}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <div className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
//                 <p className="text-gray-600 mb-2"><strong>Donor Name:</strong> {selectedDonation.donorName}</p>
//                 <p className="text-gray-600 mb-2"><strong>Donor Email:</strong> {selectedDonation.donorEmail}</p>
//                 <p className="text-gray-600 mb-2"><strong>Donor Address:</strong> {selectedDonation.donorAddress}</p>
//               </div>

//               <div className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
//                 <p className="text-gray-600 mb-2"><strong>Recipient Name:</strong> {selectedDonation.recipientName}</p>
//                 <p className="text-gray-600 mb-2"><strong>Recipient Email:</strong> {selectedDonation.recipientEmail}</p>
//                 <p className="text-gray-600 mb-2"><strong>Recipient Address:</strong> {selectedDonation.recipientAddress}</p>
//               </div>
//             </div>

//             <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
//               <p className="mb-2"><span className="font-bold">Quantity:</span> {selectedDonation.quantity}</p>
//               <p className="mb-2"><span className="font-bold">Status:</span> {selectedDonation.status}</p>
//               <p className="mb-2"><span className="font-bold">Donation Date:</span> {selectedDonation.donationDate}</p>
//               <p className="mb-2"><span className="font-bold">Donation Time:</span> {selectedDonation.donationTime}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       <h2 className="text-3xl font-bold mt-6 mb-6 text-center">Orphanage Donations</h2>
//     </div>
//   );
// };

// export default DonationsDashboard;

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaSpinner, FaCalendarAlt, FaClock, FaBox, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

const DonationsDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [orphanageDonations, setOrphanageDonations] = useState([]); // For orphanage donations
  const [selectedDonation, setSelectedDonation] = useState(null); // For modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewDetails, setViewDetails] = useState(false); // Modal state

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const donorEmail = decodedToken.email;

          // Fetch normal donations
          const response = await fetch(`http://localhost:5000/api/donations/completed?donorEmail=${donorEmail}`);
          const data = await response.json();

          // Fetch orphanage donations
          const orphanageResponse = await fetch(`http://localhost:5000/api/donations/completed/orphanage?donorEmail=${donorEmail}`);
          const orphanageData = await orphanageResponse.json();

          // Sort by date
          const sortedDonations = data.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
          const sortedOrphanageDonations = orphanageData.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));

          setDonations(sortedDonations);
          setOrphanageDonations(sortedOrphanageDonations);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('Failed to load donations.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-blue-600" /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Handle clicking on a donation to view details
  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setViewDetails(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Completed Donations</h2>
      
      {/* Normal Donations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleViewDetails(donation)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MdFastfood className="mr-2 text-yellow-500" /> {donation.foodItem}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaBox className="mr-2" /> <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {donation.donationDate}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaClock className="mr-2" /> <strong>Time:</strong> {donation.donationTime}
                  </p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-1" /> {donation.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
            No completed donations available.
          </p>
        )}
      </div>

      <h2 className="text-3xl font-bold mt-6 mb-6 text-center">Orphanage Donations</h2>
      
      {/* Orphanage Donations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {orphanageDonations.length > 0 ? (
          orphanageDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleViewDetails(donation)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MdFastfood className="mr-2 text-yellow-500" /> {donation.foodItem}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaBox className="mr-2" /> <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {donation.donationDate}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaClock className="mr-2" /> <strong>Time:</strong> {donation.donationTime}
                  </p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-1" /> {donation.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
            No orphanage donations available.
          </p>
        )}
      </div>

      {/* Modal for showing donation details */}
      {viewDetails && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setViewDetails(false)} // Close modal
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-500">Donation Details</h3>

            <div className="flex items-center mb-4 space-x-4">
              <MdFastfood size={32} className="text-green-500" />
              <span className="font-bold text-lg">Food Item:</span>
              <p className="text-lg">{selectedDonation.foodItem}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
                <p className="text-gray-600 mb-2"><strong>Donor Name:</strong> {selectedDonation.donorName}</p>
                <p className="text-gray-600 mb-2"><strong>Donor Email:</strong> {selectedDonation.donorEmail}</p>
                <p className="text-gray-600 mb-2"><strong>Donor Address:</strong> {selectedDonation.donorAddress}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
                <p className="text-gray-600 mb-2"><strong>Recipient Name:</strong> {selectedDonation.recipientName}</p>
                <p className="text-gray-600 mb-2"><strong>Recipient Email:</strong> {selectedDonation.recipientEmail}</p>
                <p className="text-gray-600 mb-2"><strong>Recipient Address:</strong> {selectedDonation.recipientAddress}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
              <p className="mb-2"><span className="font-bold">Quantity:</span> {selectedDonation.quantity}</p>
              <p className="mb-2"><span className="font-bold">Status:</span> {selectedDonation.status}</p>
              <p className="mb-2"><span className="font-bold">Donation Date:</span> {selectedDonation.donationDate}</p>
              <p className="mb-2"><span className="font-bold">Donation Time:</span> {selectedDonation.donationTime}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsDashboard;
