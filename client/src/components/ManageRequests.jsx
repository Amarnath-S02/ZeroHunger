import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [filterDate, setFilterDate] = useState('');
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editedRequest, setEditedRequest] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    foodItem: '',
    quantity: '',
    foodImage: '',
    date: '',
    time: '',
    donor: '',
    status: ''
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
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

  const filteredRequests = requests
    .filter((request) =>
      request.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      request.foodItem?.toLowerCase()?.includes(searchQuery.toLowerCase())
    )
    .filter((request) =>
      !filterDate || new Date(request.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
    );

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  // Save changes to request
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, editedRequest);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, ...editedRequest } : request
        )
      );
      setEditingRequestId(null);
      setEditedRequest({
        name: '',
        email: '',
        address: '',
        city: '',
        foodItem: '',
        quantity: '',
        foodImage: '',
        date: '',
        time: '',
        donor: '',
        status: ''
      });
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleEdit = (request) => {
    setEditingRequestId(request._id);
    setEditedRequest({
      name: request.name,
      email: request.email,
      address: request.address,
      city: request.city,
      foodItem: request.foodItem,
      quantity: request.quantity,
      foodImage: request.foodImage,
      date: request.date,
      time: request.time,
      donor: request.donor,
      status: request.status
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Manage Requests</h2>

        {/* Search, Sort, and Date Filter */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="border p-2 rounded-lg w-full lg:w-1/3"
            placeholder="Search by Requester or Food Name"
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

        {/* Request Table */}
        <div className="overflow-x-scroll">
          <table className="table-auto w-full text-left bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Request ID</th>
                <th className="p-4">Requester</th>
                <th className="p-4">Food Item</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Time</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Donor</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.length > 0 ? (
                sortedRequests.map((request) => (
                  <tr key={request._id} className="border-b">
                    <td className="p-4">{request._id}</td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.name}
                          onChange={(e) => setEditedRequest({ ...editedRequest, name: e.target.value })}
                        />
                      ) : (
                        request.name
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.foodItem}
                          onChange={(e) => setEditedRequest({ ...editedRequest, foodItem: e.target.value })}
                        />
                      ) : (
                        request.foodItem
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="number"
                          className="border p-2 rounded-lg"
                          value={editedRequest.quantity}
                          onChange={(e) => setEditedRequest({ ...editedRequest, quantity: e.target.value })}
                        />
                      ) : (
                        request.quantity
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.time}
                          onChange={(e) => setEditedRequest({ ...editedRequest, time: e.target.value })}
                        />
                      ) : (
                        request.time
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.date}
                          onChange={(e) => setEditedRequest({ ...editedRequest, date: e.target.value })}
                        />
                      ) : (
                        request.date
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.address}
                          onChange={(e) => setEditedRequest({ ...editedRequest, address: e.target.value })}
                        />
                      ) : (
                        request.address
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <select
                          className="border p-2 rounded-lg"
                          value={editedRequest.status}
                          onChange={(e) => setEditedRequest({ ...editedRequest, status: e.target.value })}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="InProgress">In Progress</option>
                        </select>
                      ) : (
                        request.status
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedRequest.donor}
                          onChange={(e) => setEditedRequest({ ...editedRequest, donor: e.target.value })}
                        />
                      ) : (
                        request.donor
                      )}
                    </td>
                    <td className="p-4">
                      {editingRequestId === request._id ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleSave(request._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                            onClick={() => setEditingRequestId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleEdit(request)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-4 text-center">No requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;
