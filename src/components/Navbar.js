import React from 'react';
import logo from '../images/Viterra.svg'; 
import DarkModeToggle from './DarkModeToggle';
import UserToggle from './UserToggle'; 

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      <div className="flex items-center space-x-4">
        <UserToggle onOpenModal={onOpenModal} />
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
