import React, { useState } from 'react';
import DonationComponent from './DonationComponent';
import RequestComponent from './RequestComponent';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="relative font-inter antialiased mt-4 ">
        <h2 className='text-3xl md:text-4xl font-bold text-custom-orange text-center'>Services</h2>
      <main className="relative flex flex-col justify-center bg-white overflow-hidden">
        <div className="max-w-full mx-4 md:mx-10 my-4">

          <div>
            <div className="flex justify-center">
              <div
                role="tablist"
                className="max-[480px]:max-w-[180px] inline-flex flex-wrap justify-center bg-slate-200 rounded-[20px] p-1 mb-8 min-[480px]:mb-12"
              >
                {/* Button #1 */}
                <button
                  id="tab-1"
                  className={`flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${
                    activeTab === 1 ? 'bg-white text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Donation
                </button>
                {/* Button #2 */}
                <button
                  id="tab-2"
                  className={`flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out ${
                    activeTab === 2 ? 'bg-white text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveTab(2)}
                >
                  Request
                </button>
              </div>
            </div>

            {/* Tab panels */}
            {activeTab === 1 && <DonationComponent />}
            {activeTab === 2 && <RequestComponent />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TabsComponent;