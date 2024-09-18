import React from 'react';
import Home from '../components/Home';
import Donor from '../components/DonorForm'
import Recipient from '../components/RecipientForm';
import Service from '../components/TabsComponent'
import AboutUs from '../components/AboutUs';
// import '../services/BgAnimation.css'
import '../index.css'

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen p-8" class="example-box">
      <div class="background-shapes"></div>
      <Home />
      <Donor />
      <Recipient />
      <Service />
      <AboutUs />
    </div>
  );
};

export default HomePage;
