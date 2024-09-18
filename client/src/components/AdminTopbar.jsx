import React from 'react';

const Topbar = ({ onLogout }) => {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-md z-10 flex justify-between items-center px-6">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
