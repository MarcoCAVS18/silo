import React, { useState } from 'react';
import { Clipboard, Pencil, Check } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';  // Importa el hook de contexto

const SiloCard = ({ siloNumber, silo }) => {
  const [meters, setMeters] = useState(silo.meters || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { updateSiloMeters } = useFirebase();  // Accede a la función desde el contexto

  const handleSave = () => {
    updateSiloMeters(siloNumber, meters);  // Llamar a la función de actualización de Firebase
    setIsEditing(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(meters.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 transition-colors duration-300 border-2 border-gray-300 dark:border-gray-700 hover:shadow-2xl transform hover:scale-105 h-64 flex flex-col justify-center items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
            Cell {siloNumber}
          </h3>
          <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            {meters.toFixed(2)} meters
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-700 hover:text-gray-800 flex items-center dark:text-gray-100 dark:hover:text-gray-200"
          >
            <Pencil className="mr-1" size={20} />
          </button>

          <button 
            onClick={handleCopyToClipboard}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            {copied ? (
              <Check className="text-green-500" size={24} />
            ) : (
              <Clipboard size={24} />
            )}
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="flex flex-col space-y-2 w-full mt-4">
          <input
            type="number"
            inputMode="decimal"
            value={meters}
            onChange={(e) => setMeters(parseFloat(e.target.value))}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter new meter value"
          />
          <button 
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SiloCard;

