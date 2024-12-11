import React, { useEffect, useState } from 'react';
import SiloCard from './SiloCard';
import { useFirebase } from '../context/FirebaseContext';

const SiloGrid = ({ currentBlock }) => {
  const [blockData, setBlockData] = useState({});
  const [isAnimating, setIsAnimating] = useState(false); 
  const { loadSilos } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      setIsAnimating(true); 
      const data = await loadSilos(currentBlock); 
      setBlockData(data);

    
      setTimeout(() => setIsAnimating(false), 500); 
    };

    fetchData();
  }, [currentBlock, loadSilos]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.entries(blockData).map(([siloNumber, siloData]) => (
        <SiloCard
          key={siloNumber}
          block={currentBlock}
          siloNumber={siloNumber}
          silo={siloData}
          isAnimating={isAnimating} 
        />
      ))}
    </div>
  );
};

export default SiloGrid;
