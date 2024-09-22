import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import Profile from '../assets/images/user_profile.jpg';
import Logo from '../assets/images/zerohunger_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    // Event listener to close the dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSignOut = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="border-gray-200 bg-custom-orange">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <RouterLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-12" alt="Zero Hunger Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Zero Hunger</span>
        </RouterLink>

        <div className="relative flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={Profile} alt="User profile" />
          </button>

          {/* Dropdown menu */}
          <div
            ref={dropdownRef} // Attach the ref to the dropdown
            className={`absolute right-0 mt-64 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-orange-600 ${dropdownOpen ? 'block' : 'hidden'}`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-2">
              <li>
                <RouterLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </RouterLink>
              </li>
              {!isAuthenticated ? (
                <>
                  <li>
                    <RouterLink
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Login
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign Up
                    </RouterLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-white dark:focus:ring-white"
            aria-controls="navbar-user"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse my-2">
            <li>
              <Link
                to="/"
                smooth={true}
                duration={500}
                className="block py-1 px-3 text-white hover:bg-white rounded-xl md:hover:text-orange-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="donate"
                smooth={true}
                duration={500}
                className="block py-1 px-3 text-white hover:bg-white rounded-xl md:hover:text-orange-600"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                to="request"
                smooth={true}
                duration={500}
                className="block py-1 px-3 text-white hover:bg-white rounded-xl md:hover:text-orange-600"
              >
                Request
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="block py-1 px-3 text-white hover:bg-white rounded-xl md:hover:text-orange-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="aboutus"
                smooth={true}
                duration={500}
                className="block py-1 px-3 text-white hover:bg-white rounded-xl md:hover:text-orange-600"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
