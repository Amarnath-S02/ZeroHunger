import React from "react";

const features = [
    {
      title: "About Us",
      description: "At ZERO-HUNGER, we are on a mission to combat hunger and food insecurity in our communities. Founded with a deep-rooted commitment to making a meaningful difference in the lives of others, ZERO-HUNGER strives to be the bridge between surplus food resources and those in need.",
      svgPath: "M32 4C18.745 4 8 14.745 8 28s10.745 24 24 24 24-10.745 24-24S45.255 4 32 4zm0 44c-11.046 0-20-8.954-20-20S20.954 8 32 8s20 8.954 20 20-8.954 20-20 20z",
    },
    {
      title: "Our Vision",
      description: "Our vision is simple yet profound: to create a world where no one goes to bed hungry. We envision a future where access to nutritious meals is a fundamental human right, where every individual has the opportunity to thrive and reach their full potential without the burden of hunger weighing them down.",
      svgPath: "M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2zm0 54c-13.255 0-24-10.745-24-24S18.745 8 32 8s24 10.745 24 24-10.745 24-24 24z",
    },
    {
      title: "Our Mission",
      description: "Our mission drives everything we do at ZERO-HUNGER. We are dedicated to connecting surplus food resources with individuals, families, and communities facing food insecurity. Through our innovative platform, we facilitate the seamless donation of surplus food from individuals, businesses, and organizations to local food banks, shelters, and community centers. Together, we work tirelessly to ensure that nutritious meals reach those who need them the most.",
      svgPath: "M32 0C14.326 0 0 14.326 0 32s14.326 32 32 32 32-14.326 32-32S49.674 0 32 0zm0 56c-13.255 0-24-10.745-24-24S18.745 8 32 8s24 10.745 24 24-10.745 24-24 24z",
    },
    {
      title: "Our Values",
      description: "Our values are the guiding principles that shape every action we take. We believe in compassion, collaboration, and community. These values drive our efforts to create a world where hunger is a thing of the past.",
      svgPath: "M32 3C16.536 3 4 15.536 4 31s12.536 28 28 28 28-12.536 28-28S47.464 3 32 3zm0 52c-13.255 0-24-10.745-24-24S18.745 7 32 7s24 10.745 24 24-10.745 24-24 24z",
    },
    {
      title: "Join Us",
      description: "Join us in our mission to make a tangible difference in the fight against hunger. Whether you're a donor looking to contribute surplus food or a recipient in need of assistance, ZERO-HUNGER welcomes you with open arms. Together, we can build a brighter, more nourished future for all.",
      svgPath: "M32 6C16.561 6 4 18.561 4 34s12.561 28 28 28 28-12.561 28-28S47.439 6 32 6zm0 50c-12.131 0-22-9.869-22-22S19.869 12 32 12s22 9.869 22 22-9.869 22-22 22z",
    },
    {
      title: "Seamless Coordination",
      description: "At ZERO-HUNGER, we prioritize seamless coordination to ensure that surplus food reaches those who need it most efficiently. Our robust workflow system connects donors with recipients in real-time, minimizing food waste and maximizing impact.",
      svgPath: "M32 0C14.326 0 0 14.326 0 32s14.326 32 32 32 32-14.326 32-32S49.674 0 32 0zm0 56c-13.255 0-24-10.745-24-24S18.745 8 32 8s24 10.745 24 24-10.745 24-24 24z",
    }
  ];
  
  const AboutUs = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-orange text-center">About Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <div
      key={index}
      className="p-6 border-2 border-custom-orange rounded-lg shadow-lg flex flex-col items-center text-center bg-white hover:bg-custom-orange transition duration-300 ease-in-out transform hover:scale-105"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <svg className="w-12 h-12 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`gradient${index}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop stopColor="#FFF" offset="0%"></stop>
            <stop stopColor="#E2EEFF" offset="100%"></stop>
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="32" fill="#5091EE"></rect>
        <use fill="url(#gradient)" xlinkHref={`#path${index}`}></use>
        <path id={`path${index}`} d={feature.svgPath} fill="#fff"></path>
      </svg>
      <h3 className="text-lg font-semibold mb-2 text-custom-orange group-hover:text-white">
        {feature.title}
      </h3>
      <p className="text-black text-justify group-hover:text-white">
        {feature.description}
      </p>
    </div>
  ))}
</div>
      </div>
    );
  };

export default AboutUs;

