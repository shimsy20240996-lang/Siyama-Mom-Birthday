import React from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onOpen, birthDate }) => {
  return (
    <div className="section-container relative flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center max-w-4xl z-10 p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(244,114,182,0.1)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-50" />
        
        <motion.p 
          className="text-sm md:text-base text-pink-300 font-sans tracking-[0.3em] mb-4 uppercase relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          Est. {birthDate}
        </motion.p>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 font-sans font-light tracking-wide mb-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          I made something special...
        </motion.p>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-serif text-white mb-16 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 3.5, duration: 2, ease: "easeOut" }}
        >
          For Mom <span className="text-pink-400 inline-block animate-pulse">❤️</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1.5 }}
          className="relative z-10"
        >
          <button onClick={onOpen} className="btn-primary flex items-center justify-center mx-auto gap-3 group">
            Open Your Surprise 
            <span className="text-xl group-hover:rotate-12 transition-transform duration-300">✨</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
