import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalCelebration = ({ onReplay }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fire confetti fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#AD7466', '#F4D9D0', '#E3B7AD', '#6C4C4A'] };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Show content after a short delay
    setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-container min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#E3B7AD]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4D9D0]/40 rounded-full blur-[120px]" />
      
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="text-center z-10 p-12 md:p-20 rounded-3xl bg-[#FFF9F5]/80 backdrop-blur-md border border-[#E5C1B8] shadow-xl max-w-4xl mx-auto w-full relative overflow-hidden"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-serif text-[#6C4C4A] mb-6 drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Happy Birthday!
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-3xl text-[#8E706B] font-sans tracking-wide mb-12 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Have the most wonderful day. ❤️
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.button 
              onClick={onReplay}
              className="btn-primary tracking-wide text-sm mx-auto shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Replay My Surprise <span className="text-xl ml-2">↻</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FinalCelebration;
