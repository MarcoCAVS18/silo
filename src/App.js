import React, { useState, useEffect } from 'react';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { useFirebase } from './context/FirebaseContext';
import Navbar from './components/Navbar';
import BlockSelector from './components/BlockSelector';
import SiloGrid from './components/SiloGrid';
import LastUpdatedMessage from './components/LastUpdatedMessage';
import Footer from './components/Footer';
import UserVerification from './components/UserVerification'; 
import UserToggle from './components/UserToggle';

function App() {
  const [currentBlock, setCurrentBlock] = useState('block1'); 
  const [blockData, setBlockData] = useState({});
  const { loadSilos } = useFirebase();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isUserVerified, setIsUserVerified] = useState(false); 

  useEffect(() => {
    const loadBlockData = async () => {
      if (!currentBlock) {
        console.warn("currentBlock está vacío. No se puede cargar la colección.");
        return;
      }
      try {
        const data = await loadSilos(currentBlock);
        setBlockData(data);
      } catch (error) {
        console.error("Error al cargar los datos del bloque:", error);
      }
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
    const selectedCollection = collectionMap[block];
    if (selectedCollection) {
      setCurrentBlock(selectedCollection);
    } else {
      console.warn("Bloque seleccionado no es válido:", block);
    }
  };

  const handleUserVerification = (password) => {
    if (password === 'viterra123') {
      setIsUserVerified(true);
      setIsModalOpen(false);
      localStorage.setItem('password', password);
      localStorage.setItem('lastVerifiedTime', Date.now()); 
    } else {
      alert('Incorrect password');
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        
        <div className="relative z-20">
          <Navbar onOpenModal={handleOpenModal} />
          
          {isModalOpen && !isUserVerified && (
            <UserVerification onVerify={handleUserVerification} onClose={handleCloseModal} />
          )}

          <div className="container mx-auto p-4">
            <BlockSelector onSelectBlock={handleBlockChange} initialBlock="Block 1" />
            <LastUpdatedMessage />
            <SiloGrid blockData={blockData} currentBlock={currentBlock} />
          </div>

          <Footer />
        </div>

        {isModalOpen && !isUserVerified && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-30 backdrop-blur-md z-10"></div>
        )}
        
      </div>

      <UserToggle isUserVerified={isUserVerified} onOpenModal={handleOpenModal} />
    </ThemeProvider>
  );
}

export default App;


