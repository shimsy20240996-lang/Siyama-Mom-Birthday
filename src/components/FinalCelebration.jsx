import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalCelebration = ({ onReplay }) => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f472b6', '#fda4af', '#fcd34d', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f472b6', '#fda4af', '#fcd34d', '#ffffff']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="celebration" className="section-container min-h-screen py-20 bg-gradient-to-b from-transparent to-pink-900/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="text-center z-10 p-8 w-full max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-serif text-white mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          HAPPY BIRTHDAY,<br/><span className="text-pink-400 mt-4 inline-block">MOM! 🎂❤️</span>
        </motion.h1>
        
        <p className="text-2xl md:text-3xl font-sans text-pink-200 mb-16 italic">
          You are loved more than words can ever say.
        </p>

        <motion.button 
          onClick={onReplay}
          className="text-white border-2 border-white/50 rounded-full px-8 py-4 hover:bg-white/20 transition-all font-sans tracking-widest text-sm uppercase flex items-center justify-center mx-auto gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Replay My Surprise <span>↻</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FinalCelebration;
