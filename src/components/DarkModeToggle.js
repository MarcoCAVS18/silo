import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {isDarkMode ? (
        <Sun className="text-yellow-500" size={24} />
      ) : (
        <Moon className="text-gray-800" size={24} />
      )}
    </button>
  );
};

export default DarkModeToggle;