import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemoryGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div id="memories" className="section-container min-h-screen py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl px-4 z-10"
      >
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-20 text-white drop-shadow-md">
          A Lifetime of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">Memories</span>
        </h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                boxShadow: "0 25px 50px -12px rgba(244, 114, 182, 0.25)" 
              }}
              className="break-inside-avoid bg-white/5 backdrop-blur-md p-3 pb-12 rounded-2xl border border-white/10 shadow-xl cursor-pointer relative group overflow-hidden"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              <div className="overflow-hidden rounded-xl bg-gray-900 relative z-10">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center px-6 z-10">
                <p className="font-serif text-white/90 text-lg md:text-xl italic font-light drop-shadow-md tracking-wide">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-5xl w-full bg-white/5 p-2 rounded-2xl shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption} 
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />
              <p className="text-center font-serif text-white text-2xl italic mt-6 mb-4 font-light tracking-wide">
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
