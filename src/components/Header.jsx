import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

function Header({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <header className="sticky top-0 before:absolute before:inset-0 bg-[#0A0A0A] before:backdrop-blur-md before:-z-10 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Hamburger button */}
          <button
            className="text-gray-400 hover:text-gray-400 lg:hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

          {/* Header: Left side (Search bar) */}
          <div className="flex items-center space-x-4 w-full md:w-auto">

            {/* Search Bar */}
            <div className="relative flex-grow md:w-1/2  sm:l-2">
              <input
                type="text"
                placeholder="Search by artist, song or album"
                className="pl-10 pr-4 py-2 bg-[#1E1E1E] ml-2 md:w-sm w-[220px] text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Search Icon */}
              <Search className="absolute left-3 ml-2 top-1/2 transform -translate-y-1/2 w-5 text-gray-400" />
            </div>
          </div>

          {/* Header: Right side (Profile) */}
          <div className="flex items-center space-x-3">
            
            {/* Divider */}
            <hr className="w-px h-6 bg-gray-600 border-none" />

            {/* Profile Icon */}
            <div className="flex items-center space-x-3">
              <img
                src="https://i.pinimg.com/736x/ab/a5/ff/aba5ff27644662105b5b76d603ae330e.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
