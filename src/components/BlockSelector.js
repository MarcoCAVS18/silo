// BlockSelector.js

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  


const BlockSelector = ({ onSelectBlock }) => {
  const [selectedBlock, setSelectedBlock] = useState('Block 3');
  const blocks = ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'];

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    onSelectBlock(block);
  };

  return (
    <div className="py-4">
      <div className="sm:hidden">
        <Swiper
          spaceBetween={20} 
          slidesPerView={2.2} 
          centeredSlides={true} 
          loop={true}
          onSlideChange={(swiper) => setSelectedBlock(blocks[swiper.activeIndex])}
        >
          {blocks.map((block) => (
            <SwiperSlide key={block} className="flex-shrink-0">
              <button
                onClick={() => handleBlockClick(block)}
                className={`px-4 py-2 rounded w-full ${
                  selectedBlock === block
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white'
                }`}
              >
                {block}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden sm:grid sm:grid-cols-5 gap-4">
        {blocks.map((block) => (
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
    </div>
  );
};

export default BlockSelector;
