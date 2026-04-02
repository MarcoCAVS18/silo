// FirebaseContext.js

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../FirebaseConfig';
import { collection, getDocs, doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';  

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [silos] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

useEffect(() => {
  const loadLastUpdated = async () => {
    try {
      const blockSnapshots = [
        await getDocs(collection(db, 'block1')),
        await getDocs(collection(db, 'block2')),
        await getDocs(collection(db, 'silo')),
        await getDocs(collection(db, 'block4')),
        await getDocs(collection(db, 'block5')),
      ];

      let latestUpdate = null;

      blockSnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.lastUpdated && data.lastUpdated.seconds) {
            if (!latestUpdate || data.lastUpdated.seconds > latestUpdate.seconds) {
              latestUpdate = data.lastUpdated;
            }
          }
        });
      });

      if (latestUpdate) {
        setLastUpdated(latestUpdate);
      } else {
        console.warn("No se encontró ninguna fecha de actualización válida.");
      }
    } catch (error) {
      console.error("Error al cargar la última fecha de actualización:", error.message);
    }
  };

  loadLastUpdated();
}, []);


  const loadSilos = useCallback(async (block) => {
    if (!block) {
      console.error("Error: 'block' está vacío. No se puede cargar la colección.");
      return {};
    }

    try {
      const blockCollection = collection(db, block);
      const blockSnapshot = await getDocs(blockCollection);

      const blockData = {};
      blockSnapshot.forEach((doc) => {
        blockData[doc.id] = doc.data();
      });

      return blockData;
    } catch (error) {
      console.error("Error al cargar los datos del bloque:", error.message);
      return {};
    }
  }, []);

  const updateSiloMeters = async (block, siloNumber, metros, kind) => {
    if (!block) {
      console.error("Error: 'block' está vacío. No se puede cargar la colección.");
      return;
    }
  
    try {
      const siloId = `${siloNumber}`;
      const siloRef = doc(db, block, siloId);
      const siloDoc = await getDoc(siloRef);
  
      if (siloDoc.exists()) {
        const updatedData = {
          ...siloDoc.data(),
          meters: parseFloat(metros),
          kind: kind,
          lastUpdated: Timestamp.now(),
        };
  
        await setDoc(siloRef, updatedData, { merge: true });
        setLastUpdated(Timestamp.now());
        } else {
        console.error(`El silo ${siloId} no existe en Firestore en el bloque ${block}.`);
      }
    } catch (error) {
      console.error("Error al actualizar el silo:", error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        silos,
        updateSiloMeters,
        loadSilos,
        lastUpdated
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
