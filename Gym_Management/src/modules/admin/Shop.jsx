import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdDashboard, MdShoppingCart, MdAttachMoney, MdStore, MdFastfood } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import SupplementStore from "./components/SupplementStore";

const Shop = () => {
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
    <div className="flex min-h-screen relative">
      {/* Burger Menu Button for Mobile */}
      {!isOpen && (
        <button className="md:hidden fixed top-14 left-2 z-50 text-black p-2 rounded" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div ref={sidebarRef} className={`fixed md:relative top-0 left-0 h-full bg-white w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex justify-center p-2">
            <a href="/home" className="text-xl p-1 font-extrabold text-gray-700">Santoryu</a>
          </div>

          {/* Admin Dashboard Title */}
          <div className="flex justify-between items-center p-2 text-gray-800">
            <span className="font-semibold">Admin Dashboard</span>

            {/* Close button for mobile */}
            <button className="md:hidden text-gray-800" onClick={() => setIsOpen(false)}>
              <IoClose size={24} />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col flex-grow p-4 space-y-4">
            <Link to="/admin" className="flex items-center text-gray-800 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              <MdDashboard className="mr-2" size={20} /> Dashboard
            </Link>

            <Link to="/Orders" className="flex items-center text-gray-800 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              <FaClipboardList className="mr-2" size={20} /> Orders
            </Link>

            <Link to="/fee-package" className="flex items-center text-gray-800 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              <MdAttachMoney className="mr-2" size={20} /> Fee Package
            </Link>

            <Link to="/manage-shop" className="flex items-center text-gray-800 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              <MdStore className="mr-2" size={20} /> Supplement Store
            </Link>

            <Link to="/diet-plan" className="flex items-center text-gray-800 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              <MdFastfood className="mr-2" size={20} /> Diet Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30" onClick={() => setIsOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 mt-1 overflow-y-auto">
        <SupplementStore />
      </div>
    </div>
  );
};

export default Shop;
