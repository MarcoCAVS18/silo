import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LastUpdatedMessage = ({ lastUpdated }) => {
  const { isDarkMode } = useTheme();  // Accedemos al estado del tema
  const formattedDate = lastUpdated
    ? new Date(lastUpdated.toDate()).toLocaleString('en-US', {  // Convertimos a fecha legible
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
    <div className={`p-4 mb-6 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} shadow-md`}>
      <p className="text-lg font-semibold">
        Last updated: {formattedDate}
      </p>
    </div>
  );
};

export default LastUpdatedMessage;
