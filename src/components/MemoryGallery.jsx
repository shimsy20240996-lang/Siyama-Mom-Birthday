import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemoryGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="memories" className="section-container relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-20 text-[#6C4C4A] drop-shadow-sm">
          Our Family Memories
        </h2>
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 md:gap-6 pb-20">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                y: -5, 
                rotate: index % 2 === 0 ? 2 : -2,
                boxShadow: "0 25px 50px -12px rgba(108, 76, 74, 0.2)" 
              }}
              className="inline-block w-full bg-[#FFF9F5] p-2 pb-8 md:p-3 md:pb-10 rounded-sm border border-[#E5C1B8] shadow-md cursor-pointer relative group mb-6 md:mb-8"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Fake Tape */}
              <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 w-12 h-4 md:w-16 md:h-6 bg-[#E3B7AD]/80 rotate-2 backdrop-blur-sm shadow-sm z-20" />

              <div className="overflow-hidden bg-[#F2DCD4] relative z-10 min-h-[100px] md:min-h-[150px] flex items-center justify-center">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-auto object-contain transition-opacity duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load (timeout)
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-[#AD7466] font-serif text-[10px] px-2 text-center">Memory loading...</span>';
                  }}
                />
              </div>
              <div className="absolute bottom-2 md:bottom-3 left-0 w-full text-center px-2 md:px-4 z-10 h-6 md:h-8 flex items-center justify-center">
                <p className="font-serif text-[#8E706B] text-[9px] md:text-xs font-medium tracking-wide line-clamp-2 leading-tight">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDF6F3]/90 p-4 md:p-8 backdrop-blur-lg"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-[#6C4C4A] hover:bg-[#F2DCD4] transition-colors p-3 rounded-full"
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl w-full bg-[#FFF9F5] p-4 pb-16 rounded-sm shadow-2xl border border-[#E5C1B8] relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Fake Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-[#E3B7AD]/80 -rotate-2 backdrop-blur-sm shadow-sm" />
              
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption} 
                className="w-full max-h-[75vh] object-contain"
              />
              <p className="absolute bottom-6 left-0 w-full text-center px-6 font-serif text-[#8E706B] text-2xl font-medium tracking-wide">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
