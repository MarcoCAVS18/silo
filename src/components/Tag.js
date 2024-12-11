
import { useFirebase } from '../context/FirebaseContext';

const Tag = ({ label, color, cellId, collectionName }) => {
  const { assignTagToCell, isDarkMode } = useFirebase();

  const handleAssignTag = () => {
    assignTagToCell(cellId, label, collectionName); 
  };

  return (
    <div
      className={`flex items-center space-x-2 px-3 py-1 rounded-full font-semibold text-sm select-none cursor-pointer ${
        isDarkMode ? 'shadow-lg text-gray-200' : 'text-gray-800'
      }`}
      style={{
        backgroundColor: color,
        color: isDarkMode ? 'white' : 'black',
      }}
      onClick={handleAssignTag}
    >
      <span>{label}</span>
    </div>
  );
};

export default Tag;

