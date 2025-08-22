import React from 'react';
import { Outlet , useNavigate } from 'react-router-dom';
import Sidebar from '../components/AdminSidebar';
import Topbar from '../components/AdminTopbar';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await axios.post('https://zerohunger-wzdk.onrender.com/admin/logout', {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      localStorage.removeItem('token');
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar onLogout={handleLogout} />
        <div className="mt-16 p-6">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
