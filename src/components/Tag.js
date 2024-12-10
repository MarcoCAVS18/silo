// Tag.js

import React from 'react';
import { useTheme } from '../context/ThemeContext'; 

const Tag = ({ label, color }) => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className="flex items-center space-x-2 px-3 py-1 rounded-full font-semibold text-sm select-none"
            style={{
                backgroundColor: color,
                color: isDarkMode ? 'black' : 'white',
            }}
        >
            <span>{label}</span>
        </div>
    );
};

export default Tag;


