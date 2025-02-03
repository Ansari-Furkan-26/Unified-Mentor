import { Instagram, Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Social Icons Section */}
        <div className="flex space-x-6 mb-4">
          <a href="https://www.instagram.com/furqan_.26" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <Instagram size={24} />
          </a>

          <a href="mailto:26furqan.ansari@gmail.com" className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <Mail size={24} />
          </a>

          <a href="https://github.com/Ansari-Furkan-26" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <Github size={24} />
          </a>

          <a href="https://www.linkedin.com/in/furqan-ansari-frontnedgenie/" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700 my-4"></div>

        {/* Legal and Privacy Links Section */}
        <div className="flex flex-wrap justify-center md:justify-between space-x-6 mb-2 text-sm text-gray-400">
          <p className="hover:text-white transition duration-300 mb-1">Legal</p>
          <p className="hover:text-white transition duration-300 mb-1">Safety & Privacy Center</p>
          <p className="hover:text-white transition duration-300 mb-1">Privacy Policy</p>
          <p className="hover:text-white transition duration-300 mb-1">Cookies</p>
          <p className="hover:text-white transition duration-300 mb-1">About Ads</p>
          <p className="hover:text-white transition duration-300 mb-1">Accessibility</p>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-gray-400 mt-4 text-center">&copy; {new Date().getFullYear()} Ansari Mohd Furqan Shamim. All rights reserved.</p>
      </div>
    </footer>
  );
}
