import React from 'react';
import logo from '../images/Viterra.svg'; 
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
        <div className='flex items-center'>
          <img src={logo} alt="Logo"className='h-10'/>
          <div className="text-lg font-bold text-gray-800 dark:text-white">
        Silo Control
      </div>
        </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
