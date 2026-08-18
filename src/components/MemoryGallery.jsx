import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemoryGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="memories" className="section-container relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-20 text-[#6C4C4A] drop-shadow-sm">
          A Lifetime of Memories
        </h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-12 pb-20">
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
              className="break-inside-avoid bg-[#FFF9F5] p-4 pb-16 rounded-sm border border-[#E5C1B8] shadow-md cursor-pointer relative group mx-2 mt-4"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Fake Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#E3B7AD]/60 rotate-2 backdrop-blur-sm shadow-sm" />

              <div className="overflow-hidden bg-[#F2DCD4] relative z-10">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 left-0 w-full text-center px-6 z-10">
                <p className="font-serif text-[#8E706B] text-lg md:text-xl font-medium tracking-wide">
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
