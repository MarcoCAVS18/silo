import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        Silo Control
      </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
