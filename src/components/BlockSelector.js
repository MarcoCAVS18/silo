import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BlockSelector = ({ onSelectBlock, initialBlock = 'Block 1' }) => {
  const [selectedBlock, setSelectedBlock] = useState(initialBlock); 
  const blocks = ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'];
  const swiperRef = useRef(null); 

  useEffect(() => {
    setSelectedBlock(initialBlock); // Actualiza el bloque inicial si cambia
  }, [initialBlock]);

  const handleBlockClick = (block, index) => {
    setSelectedBlock(block); // Marca el bloque como seleccionado
    onSelectBlock(block); 

    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 300); 
    }
  };

  return (
    <div className="py-4">
      <div className="sm:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={2.2}
          centeredSlides={true} 
          loop={true} 
          onSwiper={(swiper) => (swiperRef.current = swiper)} 
        >
          {blocks.map((block, index) => (
            <SwiperSlide key={block}>
              <button
                onClick={() => handleBlockClick(block, index)}
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
        {blocks.map((block, index) => (
          <button
            key={block}
            onClick={() => handleBlockClick(block, index)}
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
