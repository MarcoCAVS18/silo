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
        const block1Snapshot = await getDocs(collection(db, 'block1'));
        const block2Snapshot = await getDocs(collection(db, 'block2'));
        const siloSnapshot = await getDocs(collection(db, 'silo'));
        const block4Snapshot = await getDocs(collection(db, 'block4'));
        const block5Snapshot = await getDocs(collection(db, 'block5'));

        let latestUpdate = null;

        block1Snapshot.forEach(doc => {
          if (!latestUpdate || doc.data().lastUpdated.seconds > latestUpdate.seconds) {
            latestUpdate = doc.data().lastUpdated;
          }
        });
        block2Snapshot.forEach(doc => {
          if (!latestUpdate || doc.data().lastUpdated.seconds > latestUpdate.seconds) {
            latestUpdate = doc.data().lastUpdated;
          }
        });
        siloSnapshot.forEach(doc => {
          if (!latestUpdate || doc.data().lastUpdated.seconds > latestUpdate.seconds) {
            latestUpdate = doc.data().lastUpdated;
          }
        });
        block4Snapshot.forEach(doc => {
          if (!latestUpdate || doc.data().lastUpdated.seconds > latestUpdate.seconds) {
            latestUpdate = doc.data().lastUpdated;
          }
        });
        block5Snapshot.forEach(doc => {
          if (!latestUpdate || doc.data().lastUpdated.seconds > latestUpdate.seconds) {
            latestUpdate = doc.data().lastUpdated;
          }
        });

        if (latestUpdate) {
          setLastUpdated(latestUpdate);
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
