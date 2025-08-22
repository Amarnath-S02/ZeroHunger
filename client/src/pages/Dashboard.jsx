import React, { useState } from 'react';
import DonationRequest from '../components/DonationRequestDashboard';
import Donations from '../components/DonationsDashboard';
import ReceivedFoods from '../components/ReceivedFoodsDashboard';
import 'tailwindcss/tailwind.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('donationRequest');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-orange-600 p-6">
        <h2 className="text-white text-2xl font-bold mb-6">User Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`text-white font-semibold p-4 w-full text-left ${activeTab === 'donationRequest' ? 'bg-orange-700 rounded-lg' : ''}`}
              onClick={() => setActiveTab('donationRequest')}
            >
              Donation Requests
            </button>
          </li>
          <li>
            <button
              className={`text-white font-semibold p-4 w-full text-left ${activeTab === 'donations' ? 'bg-orange-700 rounded-lg' : ''}`}
              onClick={() => setActiveTab('donations')}
            >
              Donations
            </button>
          </li>
          <li>
            <button
              className={`text-white font-semibold p-4 w-full text-left ${activeTab === 'receivedFoods' ? 'bg-orange-700 rounded-lg' : ''}`}
              onClick={() => setActiveTab('receivedFoods')}
            >
              Received Foods
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto"> {/* Add overflow-y-auto here */}
        {activeTab === 'donationRequest' && <DonationRequest />}
        {activeTab === 'donations' && <Donations />}
        {activeTab === 'receivedFoods' && <ReceivedFoods />}
      </div>
    </div>
  );
};

export default Dashboard;
