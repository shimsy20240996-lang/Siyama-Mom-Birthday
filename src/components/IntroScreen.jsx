import React from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onOpen }) => {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.p 
          className="text-xl md:text-2xl text-pink-200 font-sans tracking-wide mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I made something special...
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 font-sans mb-12 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          For someone very special to me.
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-serif text-white mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
        >
          For Mom <span className="text-pink-400">❤️</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1 }}
        >
          <button onClick={onOpen} className="btn-primary flex items-center justify-center mx-auto gap-2">
            Open Your Surprise <span className="text-xl">✨</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
