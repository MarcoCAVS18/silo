// UserToggle.js

import React from 'react';
import { User } from 'lucide-react'; 

const UserToggle = ({ isUserVerified, onOpenModal }) => {
  return (
    <button
      onClick={onOpenModal}
      className="text-gray-700 dark:text-white"
    >
      <User
        size={24} 
        color={isUserVerified ? 'currentColor' : 'green'}
        cursor={isUserVerified ? 'pointer' : 'auto'}
      />
    </button>
  );
};

export default UserToggle;
