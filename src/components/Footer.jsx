import { Instagram, Mail, Github, Linkedin, LucideLinkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 md:text-left text-center md:mb-0">&copy; {new Date().getFullYear()} Ansari Mohd Furqan Shamim. All rights reserved.</p>

        <div className="flex space-x-6">
          <a href="https://www.instagram.com/furqan_.26" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300">
            <Instagram size={24} />
          </a>

          <a href="mailto:26furqan.ansari@gmail.com" className="hover:text-red-500 transition duration-300">
            <Mail size={24} />
          </a>

          <a href="https://github.com/Ansari-Furkan-26" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <Github size={24} />
          </a>

          <a href="https://www.linkedin.com/in/furqan-ansari-frontnedgenie/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
