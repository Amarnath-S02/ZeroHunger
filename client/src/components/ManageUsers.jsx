import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('username');
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://zerohunger-wzdk.onrender.com/admin/users');
        console.log('Fetched Users:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting option change
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Handle user edit
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditFormData({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
    });
  };

  // Handle form data change
  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Submit updated user details
  const handleSubmitEdit = async (userId) => {
    try {
      await axios.put(`https://zerohunger-wzdk.onrender.com/admin/users/${userId}`, editFormData);
      setEditingUser(null);
      // Refresh users list after successful update
      const response = await axios.get('https://zerohunger-wzdk.onrender.com/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users based on the selected sort option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === 'username') {
      return a.username.localeCompare(b.username);
    } else if (sortOption === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortOption === 'firstName') {
      return a.firstName.localeCompare(b.firstName);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

        {/* Search and Sort Options */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="border p-2 rounded-lg w-3/6 mr-2"
            placeholder="Search by Username or Email"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select 
            className="border p-2 rounded-lg w-2/6"
            value={sortOption}
            onChange={handleSort}
          >
            <option value="username">Sort by Username</option>
            <option value="email">Sort by Email</option>
            <option value="firstName">Sort by First Name</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="overflow-x-scroll">
          <table className="table-auto w-full text-left bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user._id} className="border-b">
                    {editingUser === user._id ? (
                      <>
                        <td className="p-4">
                          <input
                            type="text"
                            name="username"
                            value={editFormData.username}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            name="firstName"
                            value={editFormData.firstName}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            name="lastName"
                            value={editFormData.lastName}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            name="address"
                            value={editFormData.address}
                            onChange={handleChange}
                            className="border p-2 rounded-lg"
                          />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleSubmitEdit(user._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.firstName}</td>
                        <td className="p-4">{user.lastName}</td>
                        <td className="p-4">{user.phone}</td>
                        <td className="p-4">{user.address}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
