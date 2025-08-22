import React from 'react';
import NutritionImage from '../assets/images/homedonation.png';


const Home = () => {
  return (
    <div className="px-4 max-w-full mx-4 my-16 ">
      <div className="border-2 border-custom-orange rounded-lg p-6 md:p-8 shadow-lg bg-gradient-to-r from-white via-orange-50 to-custom-orange hover:from-custom-orange hover:to-white transition-colors duration-300 group">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Content Section */}
          <div className="flex-1 text-pretty mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-custom-orange mb-4 md:mb-6 leading-tight text-justify md:text-left font-sans md:font-serif group-hover:text-white">
              An End to Malnutrition by Eliminating Food Wastage
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-4 text-justify md:text-justify group-hover:text-white">
              Millions of people around the world suffer from malnutrition while tons of food go to waste every day. Join us in fighting hunger and food insecurity by bridging the gap between surplus food and those in need. Together, we can make a difference one meal at a time.
            </p>
            <p className="text-base md:text-lg text-gray-700 text-justify md:text-justify group-hover:text-white">
              Your contribution matters; let's create a world where no one goes to bed hungry.
            </p>
            {/* <button className='bg-custom-orange text-white border border-transparent py-2 px-6 rounded-lg group-hover:bg-white group-hover:text-custom-orange transition duration-300 ease-in-out'>
    Login
</button> */}

          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img 
              src={NutritionImage} 
              alt="Food Nutrition" 
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
