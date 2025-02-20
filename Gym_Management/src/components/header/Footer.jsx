import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { CiGlobe  } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 rounded-3xl">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Santoryu</h1>
          <p className="text-gray-400">
            Transforming wellness with personalized diet plans and quality supplements.
          </p>
        </div>
        
        <div className="md:col-span-3 mt-2 md:mt-0 flex flex-row md:justify-end gap-14">
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#membership" className="hover:text-gray-300">
                  Subscription
                </a>
              </li>
              <li>
                <a href="#product" className="hover:text-gray-300">
                  Supplements Store
                </a>
              </li>
              <li>
                <a href="#diet-plan" className="hover:text-gray-300">
                  Diet Plan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">About Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Ansari-Furkan-26"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/furqanansari/"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <FaLinkedinIn /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://frontendgenie.netlify.app/"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <CiGlobe   /> Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        <p>&copy; 2025 FrontendGenie | All Rights Reserved.</p>
        <div className="mt-2">
          <a href="#privacy-policy" className="hover:text-gray-300">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#terms" className="hover:text-gray-300">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
