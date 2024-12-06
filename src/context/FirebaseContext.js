import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../FirebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [silos, setSilos] = useState({});

  const loadSilos = async () => {
    try {
      const siloCollection = collection(db, 'silo');
      const siloSnapshot = await getDocs(siloCollection);

      const silosData = {};
      siloSnapshot.forEach(doc => {
        silosData[doc.id] = doc.data();
      });

      setSilos(silosData);
    } catch (error) {
      console.error("Error al cargar los silos:", error);
    }
  };

  useEffect(() => {
    loadSilos();
  }, []);

  const updateSiloMeters = async (siloNumber, meters) => {
    try {
      const siloRef = doc(db, 'silo', siloNumber); 
      await updateDoc(siloRef, { meters, lastUpdated: new Date() }); 

      setSilos(prevSilos => ({
        ...prevSilos,
        [siloNumber]: {
          ...prevSilos[siloNumber],
          meters,
          lastUpdated: new Date(),
        },
      }));
    } catch (error) {
      console.error("Error al actualizar los metros del silo:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ silos, updateSiloMeters, loadSilos }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
