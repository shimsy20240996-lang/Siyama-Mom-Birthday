import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemoryGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div id="memories" className="section-container min-h-screen py-20 bg-black/20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl px-4"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-white">
          Our Little Memories 📸
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              className="bg-white p-4 pb-12 rounded-lg shadow-xl cursor-pointer relative group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="overflow-hidden rounded bg-gray-200 aspect-[4/3]">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center px-4">
                <p className="font-serif text-gray-800 text-lg italic">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[80vh] bg-white p-4 md:p-6 rounded-xl"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption} 
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
              <p className="text-center font-serif text-gray-800 text-xl italic mt-6">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGallery;
