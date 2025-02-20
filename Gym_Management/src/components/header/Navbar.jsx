import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    doSignOut().then(() => {
      navigate('/');
    });
  };

  // Check if the current user is admin
  const isAdmin = currentUser?.email === 'admin@gmail.com';
  const isLoggedin = userLoggedIn;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow z-20">
      <nav className="flex justify-between items-center px-6 py-2 relative">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link to="/home" className="text-xl font-extrabold text-gray-700">Santoryu</Link>
        </div>

        {/* Center - Categories */}
        <div className="hidden md:flex space-x-8">
          <a href={isLoggedin ? '/home' : '#about'} className="text-gray-700 hover:text-blue-600 font-medium">About Us</a>
          <a href="#membership" className="text-gray-700 hover:text-blue-600 font-medium">Subscription</a>
          <a href="#product" className="text-gray-700 hover:text-blue-600 font-medium">Supplements Store</a>
        </div>

        {/* Right - Notifications and Profile */}
        {userLoggedIn ? (
          <div className="flex items-center space-x-6">
            <NotificationDropdown currentUser={currentUser} />
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="focus:outline-none"
              >
                <FaUserCircle size={28} className="text-blue-600" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-36 z-30">
                  {/* Conditional Account Navigation */}
                  <Link
                    to={isAdmin ? '/admin' : '/home'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Account
                  </Link>

                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex space-x-8">
            <Link to="/login" className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">Sign in</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
