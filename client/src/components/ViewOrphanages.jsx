import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOrphanages = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [editingOrphanageId, setEditingOrphanageId] = useState(null);
  const [editedOrphanage, setEditedOrphanage] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    orphanageImage: '',
    description: '',
  });

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orphanages/view');
        setOrphanages(response.data);
      } catch (error) {
        console.error('Error fetching orphanages:', error);
      }
    };
    fetchOrphanages();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orphanages/${id}`);
      setOrphanages(orphanages.filter((orphanage) => orphanage._id !== id));
    } catch (error) {
      console.error('Error deleting orphanage:', error);
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orphanages/${id}`, editedOrphanage);
      setOrphanages((prevOrphanages) =>
        prevOrphanages.map((orphanage) =>
          orphanage._id === id ? { ...orphanage, ...editedOrphanage } : orphanage
        )
      );
      setEditingOrphanageId(null);
      setEditedOrphanage({
        name: '',
        email: '',
        phone: '',
        address: '',
        orphanageImage: '',
        description: '',
      });
    } catch (error) {
      console.error('Error updating orphanage:', error);
    }
  };

  const handleEdit = (orphanage) => {
    setEditingOrphanageId(orphanage._id);
    setEditedOrphanage({
      name: orphanage.name,
      email: orphanage.email,
      phone: orphanage.phone,
      address: orphanage.address,
      orphanageImage: orphanage.orphanageImage,
      description: orphanage.description,
    });
  };

  const filteredOrphanages = orphanages.filter((orphanage) =>
    orphanage.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
    orphanage.email?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const sortedOrphanages = [...filteredOrphanages].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'email') {
      return a.email.localeCompare(b.email);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg mx-auto">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Orphanages</h2>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by Orphanage Name or Email"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500" value={sortOption} onChange={handleSort}>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>

        {/* Orphanage Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Orphanage ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left w-80">Address</th> {/* Increased width for Address */}
                <th className="p-4 text-left w-96">Description</th> {/* Increased width for Description */}
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {sortedOrphanages.length > 0 ? (
                sortedOrphanages.map((orphanage) => (
                  <tr key={orphanage._id}>
                    <td className="p-4 text-gray-800 font-medium">{orphanage._id}</td>
                    <td className="p-4 text-gray-800">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editedOrphanage.name}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, name: e.target.value })}
                        />
                      ) : (
                        orphanage.name
                      )}
                    </td>
                    <td className="p-4 text-gray-800">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="email"
                          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editedOrphanage.email}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, email: e.target.value })}
                        />
                      ) : (
                        orphanage.email
                      )}
                    </td>
                    <td className="p-4 text-gray-800">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editedOrphanage.phone}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, phone: e.target.value })}
                        />
                      ) : (
                        orphanage.phone
                      )}
                    </td>
                    <td className="p-4 text-gray-800">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editedOrphanage.address}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, address: e.target.value })}
                        />
                      ) : (
                        orphanage.address
                      )}
                    </td>
                    <td className="p-4 text-gray-800">
                      {editingOrphanageId === orphanage._id ? (
                        <textarea
                          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editedOrphanage.description}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, description: e.target.value })}
                          rows={3}
                        />
                      ) : (
                        orphanage.description
                      )}
                    </td>
                    <td className="p-4 flex space-x-2">
                      {editingOrphanageId === orphanage._id ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleSave(orphanage._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            onClick={() => setEditingOrphanageId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={() => handleEdit(orphanage)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            onClick={() => handleDelete(orphanage._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No orphanages found.
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

export default ViewOrphanages;
