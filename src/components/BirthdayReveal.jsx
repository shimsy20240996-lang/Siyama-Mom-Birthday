import React from 'react';
import { motion } from 'framer-motion';

const BirthdayReveal = ({ onContinue }) => {
  return (
    <div className="section-container relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        className="text-center z-10 p-12 md:p-20 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] max-w-4xl mx-auto w-full relative overflow-hidden"
      >
        {/* Subtle animated flares inside card */}
        <motion.div 
          className="absolute -top-32 -left-32 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]"
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.h1 
          className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Happy Birthday,<br/> <span className="bg-gradient-to-r from-pink-400 to-rose-300 text-transparent bg-clip-text text-6xl md:text-8xl mt-6 inline-block font-bold">Mom ❤️</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 font-sans tracking-wide mb-16 font-light relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Today is all about you.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="relative z-10"
        >
          <button 
            onClick={onContinue}
            className="btn-primary tracking-wide text-sm mx-auto shadow-[0_0_30px_rgba(244,114,182,0.3)]"
          >
            Continue &rarr;
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BirthdayReveal;
