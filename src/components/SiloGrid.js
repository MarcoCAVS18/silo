// SiloGrid.js

import React, { useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext'; 
import SiloCard from './SiloCard'; 

const SiloGrid = () => {
    const { silos, loadSilos } = useFirebase();
  
    useEffect(() => {
      loadSilos();
    }, [loadSilos]);

  if (!silos || Object.keys(silos).length === 0) {
    return <div>Cargando silos...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Object.keys(silos).map(key => (
        <SiloCard key={key} siloNumber={key.replace(/^silo-/, '')} silo={silos[key]} />
      ))}
    </div>
  );
};

export default SiloGrid;
