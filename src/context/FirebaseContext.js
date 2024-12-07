import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../FirebaseConfig';
import { collection, getDocs, getDoc, doc, setDoc, Timestamp } from 'firebase/firestore';

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

  const updateSiloMeters = async (siloNumber, metros, kind) => {
    try {
      const siloId = `silo-${siloNumber}`;
      const siloRef = doc(db, 'silo', siloId);
  
      const siloDoc = await getDoc(siloRef);
  
      if (siloDoc.exists()) {
        await setDoc(siloRef, {
          ...siloDoc.data(),
          meters: metros,
          kind: kind, // Agregar el nuevo campo
          lastUpdated: Timestamp.now(),
        });
  
        console.log(`El silo ${siloId} se actualizó en Firestore.`);
  
        setSilos((prevSilos) => ({
          ...prevSilos,
          [siloId]: {
            ...prevSilos[siloId],
            meters: metros,
            kind: kind,
            lastUpdated: Timestamp.now(),
          },
        }));
      } else {
        console.error(`El silo ${siloId} no existe en Firestore.`);
      }
    } catch (error) {
      console.error("Error al actualizar el silo:", error);
    }
  };
  
  return (
    <FirebaseContext.Provider value={{ silos, updateSiloMeters, loadSilos }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
