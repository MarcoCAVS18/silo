// App.js

import React, { useState, useEffect } from 'react';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { useFirebase } from '../src/context/FirebaseContext';
import Navbar from './components/Navbar';
import SiloGrid from './components/SiloGrid';
import LastUpdatedMessage from './components/LastUpdatedMessage';
import Footer from './components/Footer';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './FirebaseConfig';

function App() {
  const [lastUpdated, setLastUpdated] = useState(null);
  const { silos } = useFirebase();

  useEffect(() => {
    const silosRef = collection(db, 'silo');
    
    const unsubscribe = onSnapshot(silosRef, (snapshot) => {
      const latestUpdate = snapshot.docs
        .map(doc => doc.data().lastUpdated)
        .reduce((latest, current) => (current > latest ? current : latest), null);
      setLastUpdated(latestUpdate);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="container mx-auto p-4">
          {lastUpdated && <LastUpdatedMessage lastUpdated={lastUpdated} />}
          <SiloGrid silos={silos} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;