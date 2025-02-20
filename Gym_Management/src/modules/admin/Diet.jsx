import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import DietPlan from "./components/DietPlan";

const Diet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Burger Menu Button for Mobile - Show only when sidebar is closed */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-14 left-2 z-50 bg-text-black p-2 rounded"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 h-full bg-white w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 bg-gray-100 text-gray-800">
            <span className="text-xl font-semibold">Admin Dashboard</span>
            {/* Close button for mobile */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="flex flex-col flex-grow p-4 space-y-4">
            <Link
              to="/admin"
              className="text-gray-800 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/Orders"
              className="text-gray-800 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/fee-package"
              className="text-gray-800 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Fee Package
            </Link>
            <Link
              to="/manage-shop"
              className="text-gray-800 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Supplement Store
            </Link>
            <Link
              to="/diet-plan"
              className="text-gray-800 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Diet Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-grow mt-14">
        <DietPlan />
      </div>
    </div>
  );
};

export default Diet;
