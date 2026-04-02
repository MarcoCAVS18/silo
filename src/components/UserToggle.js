import React from 'react';
import { User, UserX } from 'lucide-react'; 
import { useTheme } from '../context/ThemeContext';

const UserToggle = ({ isUserVerified, onOpenModal }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <button onClick={onOpenModal} className="text-gray-700 dark:text-white">
        {isUserVerified ? (
          <User size={24} color="green" cursor="pointer" />
        ) : (
          <UserX size={24} color={isDarkMode ? "white" : "black"} cursor="pointer" />
        )}
      </button>
    );
  };
  

export default UserToggle;