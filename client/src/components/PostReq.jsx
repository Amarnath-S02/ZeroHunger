import React from 'react';

const PostReq = ({ name, quantity, time, email, onClick }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl rounded-2xl overflow-hidden max-w-sm hover:scale-105 transform-gpu">
      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Card body */}
        <div className="flex-1">
          {/* Header */}
          <header className="mb-2">
            <h2 className="text-xl font-extrabold leading-snug">
              <a
                className="text-slate-900 hover:text-indigo-500 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                href="#0"
              >
                {name}
              </a>
            </h2>
          </header>
          {/* Content */}
          <div className="text-sm text-slate-600 mb-2">
            <p><strong>Quantity:</strong> {quantity}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600"><strong>Time:</strong> {time}</p>
            {/* Donate Now Button */}
            <button
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 hover:scale-105 transform transition-transform duration-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
              onClick={() => onClick(email)} // Trigger the onClick function with email
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReq;
