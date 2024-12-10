// SiloGrid.js

import React from 'react';
import SiloCard from './SiloCard';

const SiloGrid = ({ blockData, currentBlock }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.entries(blockData).map(([siloNumber, siloData]) => (
        <SiloCard
          key={siloNumber}
          block={currentBlock} 
          siloNumber={siloNumber}
          silo={siloData}
        />
      ))}
    </div>
  );
};

export default SiloGrid;