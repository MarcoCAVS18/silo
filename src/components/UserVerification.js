import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; 

const UserVerification = ({ onVerify, onClose }) => {
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme(); 

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 backdrop-blur-md z-10"></div>
      
      <div className={`relative w-96 h-80 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-30 backdrop-blur-md rounded-3xl border border-white z-20`}>
        <div className="absolute inset-0 bg-opacity-40 backdrop-blur-md" style={{ borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.18)' }}></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Please Enter Password
          </h2>

          <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            With this, you can edit each cell.
          </p>
          
          <input
            type="password"
            className={`p-3 mb-4 w-full rounded-2xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => onVerify(password)}
            className={`bg-blue-500 text-white p-3 rounded-2xl w-full mb-2 ${isDarkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-400'}`}
          >
            Verify
          </button>
          
          <button
            onClick={onClose}
            className={`bg-gray-500 text-white p-3 rounded-2xl w-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-400'}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;
