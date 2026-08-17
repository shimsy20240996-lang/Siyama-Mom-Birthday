import React from 'react';
import { motion } from 'framer-motion';

const BirthdayReveal = ({ onContinue }) => {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        className="text-center z-10 glass-card p-8 md:p-16 rounded-2xl max-w-4xl mx-auto w-full"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-serif text-white mb-6 leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Happy Birthday,<br/> <span className="text-pink-400 text-5xl md:text-7xl mt-4 inline-block">Mom ❤️</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-pink-200 font-sans tracking-wide mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Today is all about you.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <button 
            onClick={onContinue}
            className="btn-secondary tracking-widest text-sm uppercase mx-auto"
          >
            Continue ↓
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BirthdayReveal;
