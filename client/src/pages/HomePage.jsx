import React from 'react';
import Home from '../components/Home';
import Donor from '../components/DonorForm';
import Recipient from '../components/RecipientForm';
import Service from '../components/TabsComponent';
import AboutUs from '../components/AboutUs';
import { Element } from 'react-scroll'; // Import Element from react-scroll
import '../index.css';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      <div className="background-shapes"></div>

      {/* Home Section */}
      <Element name="home">
        <Home />
      </Element>

      {/* Donate Section */}
      <Element name="donate">
        <Donor />
      </Element>

      {/* Request Section */}
      <Element name="request">
        <Recipient />
      </Element>

      {/* Services Section */}
      <Element name="services">
        <Service />
      </Element>

      {/* About Us Section */}
      <Element name="aboutus">
        <AboutUs />
      </Element>
    </div>
  );
};

export default HomePage;
