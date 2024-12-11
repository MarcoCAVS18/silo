import React, { useState } from 'react';
import { Clipboard, Pencil, Check } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useTheme } from '../context/ThemeContext';
import Tag from './Tag';

const calculateColor = (value, isDarkMode) => {
  if (value === 0.0) {
    return isDarkMode ? "#FFFFFF" : "#000000";
  }
  if (value >= 30) return "#62F032";
  if (value >= 20) return "#62F032";
  if (value >= 15) return "#FFC107";
  if (value >= 4) return "#FF8C00";
  return "#EB3845";
};

const getTagDetails = (meters) => {
  if (meters <= 4) return { label: "FULL", color: "#EB3845" };
  if (meters >= 27) return { label: "EMPTY", color: "#62F032" };
  return null;
};

const SiloCard = ({ block, siloNumber, silo = {}, isAnimating }) => {
  const [meters, setMeters] = useState(silo.meters ?? 0);
  const [kind, setKind] = useState(silo.kind ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { updateSiloMeters } = useFirebase();
  const { isDarkMode } = useTheme();

  const handleSave = () => {
    if (!block) {
      console.error(`Error: 'block' no está definido al intentar guardar el silo ${siloNumber}.`);
      return;
    }

    if (meters !== "" && !isNaN(meters) && kind.trim() !== "") {
      updateSiloMeters(block, siloNumber, meters, kind);
      setIsEditing(false);
    } else {
      console.error(`Error: Datos inválidos para el silo ${siloNumber}.`);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(meters.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const meterColor = calculateColor(meters, isDarkMode);
  const tagDetails = getTagDetails(meters);

  const cellTitle =
    block === 'silo'
      ? `Cell 3${siloNumber.replace('silo-1', '').slice(-2)}`
      : block === 'block1'
      ? `Cell 1${siloNumber.replace('silo-1', '').slice(-2)}`
      : block === 'block2'
      ? `Cell 2${siloNumber.replace('silo-1', '').slice(-2)}`
      : block === 'block4'
      ? `Cell 4${siloNumber.replace('silo-1', '').slice(-2)}`
      : block === 'block5'
      ? `Cell 5${siloNumber.replace('silo-1', '').slice(-2)}`
      : `Cell ${siloNumber.replace('silo-', '').slice(-2)}`;

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 transition-colors duration-300 border-2 border-gray-300 dark:border-gray-700 hover:shadow-2xl transform hover:scale-105 h-64 flex flex-col justify-between relative pb-16 ${isAnimating ? 'slideInUp' : ''}`}
    >
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="flex justify-between items-center w-full pt-10">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 select-none">
              {cellTitle}
            </h3>
            <div
              className="text-3xl font-bold select-none"
              style={{ color: meterColor }}
            >
              {isNaN(meters) || meters === "" ? "0.00 meters" : `${meters.toFixed(2)} meters`}
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
              className="text-gray-700 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 flex items-center"
            >
              {copied ? (
                <Check className="text-green-500" size={24} />
              ) : (
                <Clipboard size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="absolute bottom-4 left-0 right-0 flex flex-row space-x-4 px-6">
          <input
            type="number"
            inputMode="decimal"
            value={meters}
            onChange={(e) => {
              const value = Math.min(31, parseFloat(e.target.value));
              setMeters(isNaN(value) ? "" : value);
            }}
            className="w-1/2 p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="0.00"
          />
          <input
            type="text"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="w-1/2 p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Type kind"
          />
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded ${
              meters !== "" && kind.trim() !== "" && !isNaN(meters)
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={meters === "" || kind.trim() === "" || isNaN(meters)}
          >
            Save
          </button>
        </div>
      )}

      <div className="absolute top-4 w-full flex flex-wrap gap-2 capitalize opacity-70">
        {kind?.trim() && (
          <Tag
            label={kind}
            color="#007BFF"
          />
        )}
        {tagDetails && (
          <Tag
            label={tagDetails.label}
            color={tagDetails.color}
          />
        )}
      </div>
    </div>
  );
};

export default SiloCard;
