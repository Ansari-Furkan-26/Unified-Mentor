import React, { useState } from 'react';

function Header({ sidebarOpen, setSidebarOpen }) {

  return (
    <header className="sticky z-90 top-0 before:absolute before:inset-0 bg-[#0A0A0A] before:backdrop-blur-md before:-z-10">
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
      <div>.</div>
          {/* Profile Icon */}
          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-gray-600 border-none" />
            <img
              src="https://i.pinimg.com/736x/ab/a5/ff/aba5ff27644662105b5b76d603ae330e.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
