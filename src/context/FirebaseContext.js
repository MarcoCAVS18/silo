import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../FirebaseConfig';  // Asegúrate de importar la configuración de Firebase
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'; // Corrige el import

// Crear un contexto de Firebase
const FirebaseContext = createContext();

// Proveedor del contexto
export const FirebaseProvider = ({ children }) => {
  const [silos, setSilos] = useState({});

  useEffect(() => {
    const loadSilos = async () => {
      try {
        const siloCollection = collection(db, 'silo'); // Acceder a la colección
        const siloSnapshot = await getDocs(siloCollection); // Obtener todos los documentos
  
        const silosData = {};
        siloSnapshot.forEach(doc => {
          silosData[doc.id] = doc.data(); // Guardar cada documento en el objeto
        });
  
        setSilos(silosData); // Actualizar el estado con los silos
      } catch (error) {
        console.error("Error al cargar los silos:", error);
      }
    };
  
    loadSilos();
  }, []);

  const updateSiloMeters = async (siloNumber, meters) => {
    try {
      const siloRef = doc(db, 'silo', `silo-${siloNumber}`); // Crear referencia al documento
      await setDoc(siloRef, { meters, lastUpdated: new Date() }, { merge: true }); // Actualizar documento
  
      setSilos(prevSilos => ({
        ...prevSilos,
        [`silo-${siloNumber}`]: { 
          ...prevSilos[`silo-${siloNumber}`],
          meters, 
          lastUpdated: new Date()
        },
      }));
    } catch (error) {
      console.error("Error al actualizar los metros del silo:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ silos, updateSiloMeters }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useFirebase = () => useContext(FirebaseContext);
