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
    orphanageImage: ''
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

  const filteredOrphanages = orphanages
    .filter((orphanage) =>
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

  // Save changes to orphanage
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
        orphanageImage: ''
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
      orphanageImage: orphanage.orphanageImage
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">View Orphanages</h2>

        {/* Search and Sort */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="border p-2 rounded-lg w-full lg:w-1/3"
            placeholder="Search by Orphanage Name or Email"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select className="border p-2 rounded-lg w-full lg:w-1/3" value={sortOption} onChange={handleSort}>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>

        {/* Orphanage Table */}
        <div className="overflow-x-scroll">
          <table className="table-auto w-full text-left bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Orphanage ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrphanages.length > 0 ? (
                sortedOrphanages.map((orphanage) => (
                  <tr key={orphanage._id} className="border-b">
                    <td className="p-4">{orphanage._id}</td>
                    <td className="p-4">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedOrphanage.name}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, name: e.target.value })}
                        />
                      ) : (
                        orphanage.name
                      )}
                    </td>
                    <td className="p-4">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="email"
                          className="border p-2 rounded-lg"
                          value={editedOrphanage.email}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, email: e.target.value })}
                        />
                      ) : (
                        orphanage.email
                      )}
                    </td>
                    <td className="p-4">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedOrphanage.phone}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, phone: e.target.value })}
                        />
                      ) : (
                        orphanage.phone
                      )}
                    </td>
                    <td className="p-4">
                      {editingOrphanageId === orphanage._id ? (
                        <input
                          type="text"
                          className="border p-2 rounded-lg"
                          value={editedOrphanage.address}
                          onChange={(e) => setEditedOrphanage({ ...editedOrphanage, address: e.target.value })}
                        />
                      ) : (
                        orphanage.address
                      )}
                    </td>
                    <td className="p-4">
                      {editingOrphanageId === orphanage._id ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleSave(orphanage._id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                            onClick={() => setEditingOrphanageId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleEdit(orphanage)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center">No orphanages found</td>
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
