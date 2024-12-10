// LastUpdatedMessage.js

import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFirebase } from '../context/FirebaseContext';

const LastUpdatedMessage = () => {
  const { lastUpdated } = useFirebase();
  const { isDarkMode } = useTheme();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (lastUpdated) {
      const date = new Date(lastUpdated.seconds * 1000); 
      const formattedDate = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      setFormattedDate(formattedDate);
    } else {
      setFormattedDate('No updates yet');
    }
  }, [lastUpdated]);

  return (
    <div
      className={`p-4 mb-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
      } shadow-md`}
    >
      <p className="text-lg font-semibold">Last updated: {formattedDate}</p>
    </div>
  );
};

export default LastUpdatedMessage;