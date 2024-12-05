import React, { useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext'; // Hook del contexto
import SiloCard from './SiloCard'; // Importa el componente de tarjeta

const SiloGrid = () => {
  const { silos, loadSilos } = useFirebase();

  useEffect(() => {
    loadSilos(); // Cargar datos al montar el componente
  }, [loadSilos]);

  if (!silos || Object.keys(silos).length === 0) {
    return <div>Cargando silos...</div>; // Mostrar mientras se cargan los datos
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Object.keys(silos).map(key => (
        <SiloCard key={key} siloNumber={key} silo={silos[key]} /> // Renderizar tarjeta para cada silo
      ))}
    </div>
  );
};

export default SiloGrid;
