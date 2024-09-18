import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [filterDate, setFilterDate] = useState(''); // New state for date filter

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleDateFilter = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredDonations = donations
  .filter((donation) =>
    (donation.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
     donation.foodItem?.toLowerCase()?.includes(searchQuery.toLowerCase()))
  )
  .filter((donation) => 
    !filterDate || new Date(donation.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
  );


  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Manage Donations</h2>

        {/* Search, Sort, and Date Filter */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="border p-2 rounded-lg w-full lg:w-1/3"
            placeholder="Search by Donor or Food Name"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select className="border p-2 rounded-lg w-full lg:w-1/3" value={sortOption} onChange={handleSort}>
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>

          <input
            type="date"
            className="border p-2 rounded-lg w-full lg:w-1/3"
            value={filterDate}
            onChange={handleDateFilter}
          />
        </div>

        {/* Donation Table */}
        <div className="overflow-x-scroll">
          <table className="table-auto w-full text-left bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-200">
              <th className="p-4">Donation ID</th>
                <th className="p-4">Donor</th>
                <th className="p-4">Donor email</th>
                <th className="p-4">Food Name</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Time</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Recipient</th>
              </tr>
            </thead>
            <tbody>
              {sortedDonations.length > 0 ? (
                sortedDonations.map((donation) => (
                  <tr key={donation._id} className="border-b">
                    <td className="p-4">{donation._id}</td>
                    <td className="p-4">{donation.name}</td>
                    <td className="p-4">{donation.email}</td>
                    <td className="p-4">{donation.foodItem}</td>
                    <td className="p-4">{donation.quantity}</td>
                    <td className="p-4">{donation.time}</td>
                    <td className="p-4">{new Date(donation.date).toLocaleDateString()}</td>
                    <td className="p-4">{donation.address}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          donation.status === 'Pending'
                            ? 'bg-yellow-500'
                            : donation.status === 'Completed'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="p-4">{donation.recipient || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center">
                    No donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
