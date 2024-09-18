import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-custom-orange text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#donations" className='text-white'>Donations</a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#received" className='text-white'>Received Food</a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="#settings" className='text-white'>Settings</a>
            </li>
          </ul>
        </nav>
        <div className="p-6">
          <button className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-700">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {/* Donations Section */}
        <section id="donations" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Donations</h2>
          <div className="bg-white shadow rounded-lg p-6">
            {/* Replace with dynamic content */}
            <p>No donations found.</p>
          </div>
        </section>

        {/* Received Food Section */}
        <section id="received" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Received Food</h2>
          <div className="bg-white shadow rounded-lg p-6">
            {/* Replace with dynamic content */}
            <p>No received food details found.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
