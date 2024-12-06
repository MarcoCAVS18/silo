// LastUpdatedMessage.js

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LastUpdatedMessage = ({ lastUpdated }) => {
  const { isDarkMode } = useTheme();  
  const formattedDate = lastUpdated
    ? new Date(lastUpdated.toDate()).toLocaleString('en-US', {  
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    : 'No updates yet';

  return (
    <div className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} shadow-md`}>
      <p className="text-lg font-semibold">
        Last updated: {formattedDate}
      </p>
    </div>
  );
};

export default LastUpdatedMessage;
