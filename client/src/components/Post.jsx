import React from 'react';

const Post = ({ name, quantity, time, imgSrc, onBuyNow }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl rounded-2xl overflow-hidden max-w-sm hover:scale-105 transform-gpu">
      {/* Image */}
      <img className="object-cover h-48 w-full transition-transform duration-300 ease-in-out" src={imgSrc} alt={name} />

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
          <div className="text-sm text-slate-600 mb-4 flex justify-between items-center">
            <p><strong>Time:</strong> {time}</p>
            <button
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 hover:scale-105 transform transition-transform duration-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
              onClick={onBuyNow} // Trigger the buy now handler
            >
              Request Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;


// import React from 'react';

// const Post = ({ name, quantity, time, imgSrc, donorId, userId }) => {
//   return (
//     <div className="flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden max-w-sm">
//       {/* Image */}
//       <img className="object-cover h-48 w-full" src={imgSrc} alt={name} />

//       {/* Card Content */}
//       <div className="flex-1 flex flex-col p-6">
//         {/* Card body */}
//         <div className="flex-1">
//           {/* Header */}
//           <header className="mb-2">
//             <h2 className="text-xl font-extrabold leading-snug">
//               <a className="text-slate-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300" href="#0">
//                 {name}
//               </a>
//             </h2>
//           </header>
//           {/* Content */}
//           <div className="text-sm text-slate-600 mb-2">
//             <p><strong>Quantity:</strong> {quantity}</p>
//           </div>
//           <div className="text-sm text-slate-600 mb-8">
//             <p><strong>Time:</strong> {time}</p>
//           </div>
//         </div>
//         {/* Card footer */}
//         <div className="flex justify-end space-x-2">
//           {/* Show "Buy Now" only if the userId does not match the donorId */}
//           {donorId !== userId && (
//             <a
//               className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
//               href="#0"
//             >
//               Buy Now
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;
