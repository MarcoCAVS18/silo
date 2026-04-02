// Footer.js

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <footer className={`py-8 text-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <p className="text-lg font-semibold">
        Developed by Marco Piermatei
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a 
          href="https://www.linkedin.com/in/marco-piermatei/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-500 transition-colors"
        >
          <Linkedin size={24} />
        </a>
        <a 
          href="https://github.com/MarcoCAVS18/silo" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <Github size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
