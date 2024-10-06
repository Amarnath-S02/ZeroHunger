import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostOrph = ({ name, imgSrc, id }) => {
  const navigate = useNavigate();

  const handleVisit = () => {
    // Navigate to the orphanage details page, passing the orphanage ID
    navigate(`/orphanage/${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl rounded-2xl overflow-hidden max-w-sm hover:scale-105 transform-gpu">
      {/* Image */}
      <img className="object-cover h-48 w-full transition-transform duration-300 ease-in-out hover:scale-110" src={imgSrc} alt={name} />

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Card body */}
        <div className="flex-1">
          {/* Header */}
          <header className="mb-2">
            <h2 className="text-xl font-extrabold leading-snug">
              <a className="text-slate-900 hover:text-indigo-600 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300" href="#0">
                {name}
              </a>
            </h2>
          </header>
        </div>
        {/* Card footer */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            onClick={handleVisit}
          >
            Visit now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostOrph;
