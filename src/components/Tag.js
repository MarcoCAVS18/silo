import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; 

const Tag = ({ label, color, onRemove }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <div
        className="flex items-center space-x-2 px-3 py-1 rounded-full font-semibold text-sm"
        style={{
          backgroundColor: color,
          color: isDarkMode ? 'black' : 'white',
        }}
      >
        <span>{label}</span> 
        <button
          onClick={onRemove}
          className={`hover:text-gray-700 ${
            isDarkMode ? 'text-black' : 'text-white'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    );
  };
  

export default Tag;
