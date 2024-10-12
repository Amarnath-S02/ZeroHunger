import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { jwtDecode } from 'jwt-decode'; // Make sure you have this installed
import { toast } from 'react-toastify'; // Assuming you're using React Toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

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
  const decoded = jwtDecode(token);
  const userEmail = decoded.email;

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
        const response = await fetch('http://localhost:5000/api/donations/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donationRequest),
        });
  
        if (response.ok) {
          // Update the status of the donation to "Completed"
          await fetch(`http://localhost:5000/api/donations/${donation._id}/complete`, {
            method: 'PUT', // Using PUT to update the donation status
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
    <div id="tabpanel-1" role="tabpanel" aria-labelledby="tab-1" className='bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8'>
      <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Donation Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <Post
              key={index}
              name={donation.foodItem}
              quantity={donation.quantity}
              time={donation.time}
              imgSrc={`http://localhost:5000/${donation.photo}`}
              donationEmail={donation.email} // Pass the donation email to the Post component
              onBuyNow={() => handleBuyNow(donation)} // Handle the buy action
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



// import React, { useEffect, useState } from 'react';
// import Post from '../components/Post';

// const DonationComponent = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Retrieve the logged-in user's ID from local storage
//   const userId = localStorage.getItem('userId'); // Adjust according to your local storage setup

//   useEffect(() => {
//     // Fetch donations from the backend
//     const fetchDonations = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/donations/today');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setDonations(data);
//         console.log(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div id="tabpanel-1" role="tabpanel" aria-labelledby="tab-1" className="bg-white shadow-xl border-2 border-custom-orange rounded-lg p-8">
//       <h2 className="text-2xl font-bold text-custom-orange text-center mb-4">Donation Information</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {donations.length > 0 ? (
//           donations.map((donation, index) => (
//             <Post
//               key={index}
//               name={donation.foodItem}
//               quantity={donation.quantity}
//               time={donation.time}
//               imgSrc={`http://localhost:5000/${donation.photo}`}
//               donorId={donation.donorId} 
//               userId={userId} 
//             />
//           ))
//         ) : (
//           <p>No donations available for today.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonationComponent;
