import React from 'react';
import { Link } from 'react-router-dom';
import admin_pic from '../assets/images/admin.png';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen fixed top-0 left-0">
      <div className="flex items-center space-x-4 align-middle p-6">
        <img src={admin_pic} alt="admin" className="w-10 h-10 rounded-full" />
        <h2 className="text-2xl font-bold">Admin</h2>
      </div>

      <ul className="p-6 pl-4">
        <li className="mb-4">
          <Link to="/admin/manage-donation" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
          Manage Donations
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/manage-request" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
            Manage Requests
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/manage-users" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
            Manage Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/add-orphanages" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
            Add Orphanages
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/view-orphanages" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
            View Orphanages
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/reports" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-700 text-lg text-white">
            View Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
