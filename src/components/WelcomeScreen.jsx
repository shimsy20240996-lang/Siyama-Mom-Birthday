import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const WelcomeScreen = ({ onEnter }) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleEnter = () => {
    setIsExploding(true);
    
    // Fire confetti fireworks
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Wait a bit to show fireworks, then enter
    setTimeout(() => {
      onEnter();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 to-purple-900/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/20 rounded-full blur-[150px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center z-10 p-10 md:p-16 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(244,114,182,0.15)] max-w-4xl mx-auto w-full relative"
      >
        <motion.p 
          className="text-sm md:text-base text-pink-300 font-sans tracking-[0.3em] mb-6 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          A Special Message
        </motion.p>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
        >
          Wishing you the happiest of birthdays, Siyama. <br/>
          <span className="text-2xl md:text-4xl text-pink-200 font-light mt-4 inline-block">We love you so much! ❤️</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="mt-12"
        >
          <button 
            onClick={handleEnter} 
            disabled={isExploding}
            className="btn-primary flex items-center justify-center mx-auto gap-3 group px-10 py-5 shadow-[0_0_40px_rgba(244,114,182,0.6)] hover:shadow-[0_0_60px_rgba(244,114,182,0.9)] animate-pulse hover:animate-none transition-all duration-300"
          >
            Happy Birthday 
            <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">✨</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
