import React from "react";

const features = [
  {
    title: "About Us",
    description:
      "At ZERO-HUNGER, we are on a mission to combat hunger and food insecurity in our communities. Founded with a deep-rooted commitment to making a meaningful difference in the lives of others, ZERO-HUNGER strives to be the bridge between surplus food resources and those in need.",
    svgPath:
      "M10.915 2.345a2 2 0 0 1 2.17 0l7 4.52A2 2 0 0 1 21 8.544V9.5a1.5 1.5 0 0 1-1.5 1.5H19v6h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1v-6h-.5A1.5 1.5 0 0 1 3 9.5v-.955a2 2 0 0 1 .915-1.68l7-4.52ZM17 17v-6h-2v6h2Zm-6-6h2v6h-2v-6Zm-2 6v-6H7v6h2Z",
  },
  {
    title: "Our Vision",
    description:
      "Our vision is simple yet profound: to create a world where no one goes to bed hungry. We envision a future where access to nutritious meals is a fundamental human right, where every individual has the opportunity to thrive and reach their full potential without the burden of hunger weighing them down.",
    svgPath:
      "M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z",
  },
  {
    title: "Our Mission",
    description:
      "Our mission drives everything we do at ZERO-HUNGER. We are dedicated to connecting surplus food resources with individuals, families, and communities facing food insecurity. Through our innovative platform, we facilitate the seamless donation of surplus food from individuals, businesses, and organizations to local food banks, shelters, and community centers. Together, we work tirelessly to ensure that nutritious meals reach those who need them the most.",
    svgPath:
      "M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z",
  },
  {
    title: "Our Values",
    description:
      "Our values are the guiding principles that shape every action we take. We believe in compassion, collaboration, and community. These values drive our efforts to create a world where hunger is a thing of the past.",
    svgPath:
      "M20.29 8.567c.133.323.334.613.59.85v.002a3.536 3.536 0 0 1 0 5.166 2.442 2.442 0 0 0-.776 1.868 3.534 3.534 0 0 1-3.651 3.653 2.483 2.483 0 0 0-1.87.776 3.537 3.537 0 0 1-5.164 0 2.44 2.44 0 0 0-1.87-.776 3.533 3.533 0 0 1-3.653-3.654 2.44 2.44 0 0 0-.775-1.868 3.537 3.537 0 0 1 0-5.166 2.44 2.44 0 0 0 .775-1.87 3.55 3.55 0 0 1 1.033-2.62 3.594 3.594 0 0 1 2.62-1.032 2.401 2.401 0 0 0 1.87-.775 3.535 3.535 0 0 1 5.165 0 2.444 2.444 0 0 0 1.869.775 3.532 3.532 0 0 1 3.652 3.652c-.012.35.051.697.184 1.02ZM9.927 7.371a1 1 0 1 0 0 2h.01a1 1 0 0 0 0-2h-.01Zm5.889 2.226a1 1 0 0 0-1.414-1.415L8.184 14.4a1 1 0 0 0 1.414 1.414l6.218-6.217Zm-2.79 5.028a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01Z",
  },
  {
    title: "Join Us",
    description:
      "Join us in our mission to make a tangible difference in the fight against hunger. Whether you're a donor looking to contribute surplus food or a recipient in need of assistance, ZERO-HUNGER welcomes you with open arms. Together, we can build a brighter, more nourished future for all.",
    svgPath:
      "M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z",
  },
  {
    title: "Seamless Coordination",
    description:
      "At ZERO-HUNGER, we prioritize seamless coordination to ensure that surplus food reaches those who need it most efficiently. Our robust workflow system connects donors with recipients in real-time, minimizing food waste and maximizing impact.",
    svgPath:
      "M12 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-2.952.462c-.483.19-.868.432-1.19.71-.363.315-.638.677-.831.93l-.106.14c-.21.268-.36.418-.574.527C6.125 6.883 5.74 7 5 7a1 1 0 0 0 0 2c.364 0 .696-.022 1-.067v.41l-1.864 4.2a1.774 1.774 0 0 0 .821 2.255c.255.133.538.202.825.202h2.436a1.786 1.786 0 0 0 1.768-1.558 1.774 1.774 0 0 0-.122-.899L8 9.343V8.028c.2-.188.36-.38.495-.553.062-.079.118-.15.168-.217.185-.24.311-.406.503-.571a1.89 1.89 0 0 1 .24-.177A3.01 3.01 0 0 0 11 7.829V20H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H13V7.83a3.01 3.01 0 0 0 1.63-1.387c.206.091.373.19.514.29.31.219.532.465.811.78l.025.027.02.023v1.78l-1.864 4.2a1.774 1.774 0 0 0 .821 2.255c.255.133.538.202.825.202h2.436a1.785 1.785 0 0 0 1.768-1.558 1.773 1.773 0 0 0-.122-.899L18 9.343v-.452c.302.072.633.109 1 .109a1 1 0 1 0 0-2c-.48 0-.731-.098-.899-.2-.2-.12-.363-.293-.651-.617l-.024-.026c-.267-.3-.622-.7-1.127-1.057a5.152 5.152 0 0 0-1.355-.678 3.001 3.001 0 0 0-5.896.04Z",
  },
];

// const AboutUs = () => {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange text-center">
//         About Us
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className="p-6 border-2 border-custom-orange rounded-lg shadow-lg flex flex-col items-center text-center bg-white group hover:bg-custom-orange transition duration-300 ease-in-out transform hover:scale-105"
//             data-aos="fade-up"
//             data-aos-delay={index * 100}
//           >
//             <svg
//               className="w-12 h-12 mb-4 group-hover:fill-white"
//               viewBox="0 0 64 64"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect width="64" height="64" rx="32" fill="#5091EE"></rect>
//               <path d={feature.svgPath} fill="white"></path>
//             </svg>
//             <h3 className="text-lg font-semibold mb-2 text-custom-orange group-hover:text-white">
//               {feature.title}
//             </h3>
//             <p className="text-black text-justify group-hover:text-white">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange text-center">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border-2 border-custom-orange rounded-lg shadow-lg flex flex-col items-center text-center bg-white group hover:bg-custom-orange transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-indigo-600"
              >
                <path d={feature.svgPath} />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-custom-orange group-hover:text-white">{feature.title}</h3>
            <p className="text-gray-700 text-justify group-hover:text-white">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

