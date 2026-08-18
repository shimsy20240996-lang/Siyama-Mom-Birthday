import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalCelebration = ({ onReplay }) => {
  const [showContent, setShowContent] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#AD7466', '#F4D9D0', '#E3B7AD', '#6C4C4A', '#D4AF37'] };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

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
      
      {showContent && !showSurprise && (
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="text-center z-10 p-12 md:p-20 rounded-3xl bg-[#FFF9F5]/80 backdrop-blur-md border border-[#E5C1B8] shadow-xl max-w-4xl mx-auto w-full relative overflow-hidden"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-serif text-[#6C4C4A] mb-8 drop-shadow-sm leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            You Are Our Home.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-[#8E706B] font-serif italic tracking-wide mb-16 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            "Wherever life takes us, the love that holds our family together will always bring us back to you."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-[#AD7466] mb-4">Happy Birthday, Siyama ❤️</h2>
            <p className="text-lg text-[#8E706B] uppercase tracking-widest mt-4">With all our love,</p>
            <p className="text-2xl font-serif text-[#6C4C4A] mt-2">The Hameed Family</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button 
              onClick={onReplay}
              className="btn-secondary tracking-wide text-sm shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Replay My Surprise <span className="text-xl ml-2">↻</span>
            </motion.button>
            <motion.button 
              onClick={() => setShowSurprise(true)}
              className="btn-primary tracking-wide text-sm shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              One More Little Surprise... ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {showSurprise && (
        <motion.div
          key="surprise"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center z-10 w-full px-4"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-serif text-[#6C4C4A] mb-8 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            Thank you for being the heart of our family.
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-4xl text-[#AD7466] font-serif italic mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.5 }}
          >
            We love you more than words can say.
          </motion.p>
          <motion.p 
            className="text-xl text-[#8E706B] uppercase tracking-widest mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 2 }}
          >
            — The Hameed Family ❤️
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default FinalCelebration;
