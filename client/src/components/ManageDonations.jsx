import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [filterDate, setFilterDate] = useState('');
  const [editingDonationId, setEditingDonationId] = useState(null); // State to track the ID of the donation being edited
  const [editedDonation, setEditedDonation] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    foodItem: '',
    quantity: '',
    foodImage: '',
    date: '',
    time: '',
    recipient: '',
    status: ''
  });

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

  // Handle edit initiation
  const handleEdit = (donation) => {
    setEditingDonationId(donation._id);
    setEditedDonation({
      name: donation.name,
      email: donation.email,
      address: donation.address,
      city: donation.city,
      foodItem: donation.foodItem,
      quantity: donation.quantity,
      foodImage: donation.foodImage,
      date: donation.date,
      time: donation.time,
      recipient: donation.recipient,
      status: donation.status
    });
  };

  // Handle saving the edited donation
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/donations/${id}`, editedDonation);
      setDonations((prevDonations) =>
        prevDonations.map((donation) =>
          donation._id === id ? { ...donation, ...editedDonation } : donation
        )
      );
      setEditingDonationId(null);
      setEditedDonation({
        name: '',
        email: '',
        address: '',
        city: '',
        foodItem: '',
        quantity: '',
        foodImage: '',
        date: '',
        time: '',
        recipient: '',
        status: ''
      });
    } catch (error) {
      console.error('Error updating donation:', error);
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditingDonationId(null);
    setEditedDonation({
      name: '',
      email: '',
      address: '',
      city: '',
      foodItem: '',
      quantity: '',
      foodImage: '',
      date: '',
      time: '',
      recipient: '',
      status: ''
    });
  };

  const filteredDonations = donations
    .filter((donation) =>
      donation.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      donation.foodItem?.toLowerCase()?.includes(searchQuery.toLowerCase())
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
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg mx-auto">
      <div className="bg-white p-8 shadow rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Manage Donations</h2>

        {/* Search, Sort, and Date Filter */}
        <div className="flex flex-col lg:flex-row justify-between mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="border p-3 rounded-lg w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by Donor or Food Name"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select
            className="border p-3 rounded-lg w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortOption}
            onChange={handleSort}
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>

          <input
            type="date"
            className="border p-3 rounded-lg w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filterDate}
            onChange={handleDateFilter}
          />
        </div>

        {/* Donation Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Donation ID</th>
                <th className="p-4">Donor</th>
                <th className="p-4">Donor Email</th>
                <th className="p-4">Food Name</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Time</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDonations.length > 0 ? (
                sortedDonations.map((donation) => (
                  <tr
                    key={donation._id}
                    className={`border-b ${
                      editingDonationId === donation._id ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-4">{donation._id}</td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          name="name"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.name}
                          onChange={(e) => setEditedDonation({ ...editedDonation, name: e.target.value })}
                        />
                      ) : (
                        donation.name
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="email"
                          name="email"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.email}
                          onChange={(e) => setEditedDonation({ ...editedDonation, email: e.target.value })}
                        />
                      ) : (
                        donation.email
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          name="foodItem"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.foodItem}
                          onChange={(e) => setEditedDonation({ ...editedDonation, foodItem: e.target.value })}
                        />
                      ) : (
                        donation.foodItem
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="number"
                          name="quantity"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.quantity}
                          onChange={(e) => setEditedDonation({ ...editedDonation, quantity: e.target.value })}
                        />
                      ) : (
                        donation.quantity
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          name="time"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.time}
                          onChange={(e) => setEditedDonation({ ...editedDonation, time: e.target.value })}
                        />
                      ) : (
                        donation.time
                      )}
                    </td>
                    {/* <td className="p-4">{new Date(donation.date).toLocaleDateString()}</td>
                    <td className="p-4">{donation.address}</td> */}
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          className="border rounded-lg"
                          value={editedDonation.date}
                          onChange={(e) => setEditedDonation({ ...editedDonation, date: e.target.value })}
                        />
                      ) : (
                        donation.date
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          className="border rounded-lg"
                          value={editedDonation.address}
                          onChange={(e) => setEditedDonation({ ...editedDonation, address: e.target.value })}
                        />
                      ) : (
                        donation.address
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <select
                          name="status"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.status}
                          onChange={(e) => setEditedDonation({ ...editedDonation, status: e.target.value })}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="InProgress">In Progress</option>
                        </select>
                      ) : (
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
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <input
                          type="text"
                          name="recipient"
                          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editedDonation.recipient}
                          onChange={(e) => setEditedDonation({ ...editedDonation, recipient: e.target.value })}
                        />
                      ) : (
                        donation.recipient || 'N/A'
                      )}
                    </td>
                    <td className="p-4">
                      {editingDonationId === donation._id ? (
                        <div className="flex space-x-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                            onClick={() => handleSave(donation._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                          onClick={() => handleEdit(donation)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="p-4 text-center">
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
