// import React, { useEffect, useState } from 'react';

// const ReceivedFoodsDashboard = () => {
//   const [receivedFoods, setReceivedFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReceivedFoods = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/donations/received');
//         const data = await response.json();
//         setReceivedFoods(data);
//       } catch (error) {
//         console.error('Error fetching received foods:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReceivedFoods();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Received Foods</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {receivedFoods.map((food, index) => (
//           <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
//             <h3 className="font-bold">{food.foodItem}</h3>
//             <p>Quantity: {food.quantity}</p>
//             <p>Received Time: {food.time}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReceivedFoodsDashboard;

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa'; // For close icon
import { BiFoodMenu } from 'react-icons/bi'; // Food icon
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Check icon for status update
import { FiMapPin, FiMail, FiUser } from 'react-icons/fi'; // Icons for location, email, user
import { MdFastfood } from 'react-icons/md'; // Additional food icon
import { FaBox, FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa'; // Icons for details

const ReceivedFoodsDashboard = () => {
  const [receivedFoods, setReceivedFoods] = useState([]);
  const [completedFoods, setCompletedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  
  // Separate search terms for each section
  const [receivedSearchTerm, setReceivedSearchTerm] = useState('');
  const [completedSearchTerm, setCompletedSearchTerm] = useState('');

  useEffect(() => {
    const fetchReceivedFoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        // Fetch initiated foods
        const responseInitiated = await fetch(`http://localhost:5000/api/donations/received?status=initiated&email=${userEmail}`);
        const dataInitiated = await responseInitiated.json();
        setReceivedFoods(dataInitiated);

        // Fetch completed foods
        const responseCompleted = await fetch(`http://localhost:5000/api/donations/received?status=completed&email=${userEmail}`);
        const dataCompleted = await responseCompleted.json();
        setCompletedFoods(dataCompleted);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedFoods();
  }, []);

  const handleViewDetails = (food) => {
    setSelectedFood(food);
    setViewDetails(true);
  };

  const handleMarkAsReceived = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${foodId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setReceivedFoods((prevFoods) =>
          prevFoods.map((food) =>
            food._id === foodId ? { ...food, status: 'completed' } : food
          )
        );
        toast.success('Marked as received!');
        setViewDetails(false);
      } else {
        throw new Error('Failed to mark as received');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to filter and sort foods based on the search term and date
  const filterAndSortFoods = (foods, searchTerm) => {
    return foods
      .filter(food =>
        food.foodItem.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
  };

  if (loading) return <div>Loading...</div>;

  const filteredReceivedFoods = filterAndSortFoods(receivedFoods, receivedSearchTerm);
  const filteredCompletedFoods = filterAndSortFoods(completedFoods, completedSearchTerm);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Food yet to be received</h2>
      
      {/* Search Bar for Received Foods */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by food item..."
          value={receivedSearchTerm}
          onChange={(e) => setReceivedSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {filteredReceivedFoods.length > 0 ? (
          filteredReceivedFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleViewDetails(food)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MdFastfood className="mr-2 text-yellow-500" /> {food.foodItem}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaBox className="mr-2" /> <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {food.donationDate}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaClock className="mr-2" /> <strong>Time:</strong> {food.donationTime}
                  </p>
                </div>
                <div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-1" /> {food.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
            No received foods available.
          </p>
        )}
      </div>

      {/* Section for completed foods */}
      <h2 className="text-3xl font-bold mb-6 text-center mt-8">Food already received</h2>
      
      {/* Search Bar for Completed Foods */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by food item..."
          value={completedSearchTerm}
          onChange={(e) => setCompletedSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {filteredCompletedFoods.length > 0 ? (
          filteredCompletedFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleViewDetails(food)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MdFastfood className="mr-2 text-green-500" /> {food.foodItem}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaBox className="mr-2" /> <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {food.donationDate}
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaClock className="mr-2" /> <strong>Time:</strong> {food.donationTime}
                  </p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-1" /> {food.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
            No completed foods available.
          </p>
        )}
      </div>

      {/* Modal or detailed view for the selected food item */}
      {viewDetails && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setViewDetails(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Food Details</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-4">
                <p className="flex items-center">
                  <MdFastfood className="text-xl text-green-500 mr-2" />
                  <strong className="text-gray-700">Food Item:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.foodItem}</span>
                </p>
                <p className="flex items-center">
                  <FiUser className="text-xl text-blue-500 mr-2" />
                  <strong className="text-gray-700">Donor:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.donorName}</span>
                </p>
                <p className="flex items-center">
                  <FiMail className="text-xl text-indigo-500 mr-2" />
                  <strong className="text-gray-700">Donor Email:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.donorEmail}</span>
                </p>
                <p className="flex items-center">
                  <FiMapPin className="text-xl text-red-500 mr-2" />
                  <strong className="text-gray-700">Location:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.donorAddress}</span>
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="text-xl text-yellow-500 mr-2" />
                  <strong className="text-gray-700">Donation Date:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.donationDate}</span>
                </p>
                <p className="flex items-center">
                  <FaClock className="text-xl text-orange-500 mr-2" />
                  <strong className="text-gray-700">Donation Time:</strong> 
                  <span className="ml-2 text-lg text-gray-900">{selectedFood.donationTime}</span>
                </p>
                <p className="flex items-center">
                  <FaCheckCircle className={`text-xl ${selectedFood.status === 'completed' ? 'text-green-500' : 'text-yellow-500'} mr-2`} />
                  <strong className="text-gray-700">Status:</strong> 
                  <span className={`ml-2 text-lg ${selectedFood.status === 'completed' ? 'text-green-900' : 'text-yellow-900'}`}>{selectedFood.status}</span>
                </p>
              </div>
            </div>

            {/* Only show this button if the food status is not 'completed' */}
            {selectedFood.status !== 'completed' && (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleMarkAsReceived(selectedFood._id)}
              >
                Mark as Received
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedFoodsDashboard;
