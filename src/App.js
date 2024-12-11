// App.js

import React, { useState, useEffect } from 'react';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { useFirebase } from './context/FirebaseContext';
import Navbar from './components/Navbar';
import BlockSelector from './components/BlockSelector';
import SiloGrid from './components/SiloGrid';
import LastUpdatedMessage from './components/LastUpdatedMessage';
import Footer from './components/Footer';

function App() {
  const [currentBlock, setCurrentBlock] = useState('silo');
  const [blockData, setBlockData] = useState({});
  const { loadSilos } = useFirebase();

  useEffect(() => {
    const loadBlockData = async () => {
      if (!currentBlock) {
        console.warn("currentBlock está vacío. No se puede cargar la colección.");
        return;
      }
      const data = await loadSilos(currentBlock);
      setBlockData(data);
    };

    loadBlockData();
  }, [currentBlock, loadSilos]);

  const handleBlockChange = (block) => {
    const collectionMap = {
      'Block 1': 'block1',
      'Block 2': 'block2',
      'Block 3': 'silo',
      'Block 4': 'block4',
      'Block 5': 'block5',

    };
    setCurrentBlock(collectionMap[block] || '');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />

        <div className="container mx-auto p-4">
          <BlockSelector onSelectBlock={handleBlockChange} />
          <LastUpdatedMessage />
          <SiloGrid blockData={blockData} currentBlock={currentBlock} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;