// BlockSelector.js

import React, { useState } from 'react';

const BlockSelector = ({ onSelectBlock }) => {
  const [selectedBlock, setSelectedBlock] = useState('Block 3');

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    onSelectBlock(block); 
  };

  return (
    <div className="flex justify-center space-x-4 p-4">
      {['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'].map((block) => (
        <button
          key={block}
          onClick={() => handleBlockClick(block)}
          className={`px-4 py-2 rounded ${
            selectedBlock === block
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white'
          }`}
        >
          {block}
        </button>
      ))}
    </div>
  );
};

export default BlockSelector;
