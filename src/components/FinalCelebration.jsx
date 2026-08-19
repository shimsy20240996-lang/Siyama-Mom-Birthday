import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Cake = ({ stage }) => {
  const isLit = stage >= 2 && stage < 5;
  const isCut = stage >= 7;

  return (
    <div className="relative flex flex-col items-center justify-end w-[320px] h-[340px] mx-auto mt-4 mb-12">
      {/* Knife Animation */}
      <AnimatePresence>
        {stage === 7 && (
          <motion.div
            initial={{ x: 120, y: -150, opacity: 0, rotate: 30 }}
            animate={{ x: 20, y: -50, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] z-40 drop-shadow-2xl"
          >
            <svg width="50" height="160" viewBox="0 0 40 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0 C15 0 10 70 15 100 C15 105 20 110 20 110 C20 110 25 105 25 100 C30 70 25 0 25 0 Z" fill="#F4D9D0"/>
              <path d="M18 105 L22 105 L22 140 L18 140 Z" fill="#AD7466"/>
              <circle cx="20" cy="140" r="5" fill="#AD7466"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candles Wrapper */}
      <motion.div 
        className="flex gap-5 z-30 mb-[-2px] relative"
        animate={{ x: isCut ? -20 : 0, opacity: isCut ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: [0, -3, 3, 0] }}
                  exit={{ opacity: 0, scale: 0, y: -10 }}
                  transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.2, delay: i * 0.1 }, rotate: { repeat: Infinity, duration: 1.5 } }}
                  className="w-[14px] h-[22px] bg-gradient-to-t from-[#D4AF37] to-[#FFF9F5] rounded-[50%] mb-1 shadow-[0_0_12px_#D4AF37]"
                />
              )}
            </AnimatePresence>
            
            {/* Smoke */}
            <AnimatePresence>
              {stage === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 0.4, y: -40, scale: 2.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute -top-4 w-4 h-4 bg-gray-300 rounded-full blur-[4px]"
                />
              )}
            </AnimatePresence>

            {/* Candle Body */}
            <div className="w-[12px] h-[40px] bg-gradient-to-b from-[#FFF9F5] to-[#F4D9D0] border border-[#E5C1B8] rounded-t-sm relative overflow-hidden shadow-sm">
               <div className="absolute top-2 w-full h-[2px] bg-[#AD7466] rotate-12"></div>
               <div className="absolute top-6 w-full h-[2px] bg-[#AD7466] rotate-12"></div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CAKE BODY (Splits into 2 flex items) */}
      <div className="flex items-end z-20 relative drop-shadow-xl">
        {/* Main Cake (Left) */}
        <motion.div 
          className="w-[180px] h-[140px] bg-[#FDF6F3] rounded-tl-2xl rounded-bl-sm border-2 border-[#E5C1B8] border-r-0 relative overflow-hidden"
          animate={{ x: isCut ? -30 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Frosting Top */}
          <div className="absolute top-0 w-full h-[40px] bg-[#E3B7AD]">
            {/* Drips */}
            <svg className="absolute top-[39px] left-0 w-full h-[15px]" preserveAspectRatio="none" viewBox="0 0 100 20" fill="#E3B7AD">
              <path d="M0 0 Q 10 20 20 0 Q 30 15 40 0 Q 50 20 60 0 Q 70 15 80 0 Q 90 20 100 0 L 100 -10 L 0 -10 Z" />
            </svg>
          </div>
          {/* Cake Layers/Filling */}
          <div className="absolute top-[75px] w-full h-[14px] bg-[#F4D9D0]"></div>
          <div className="absolute top-[110px] w-full h-[14px] bg-[#F4D9D0]"></div>
        </motion.div>

        {/* Slice (Right) */}
        <motion.div 
          className="w-[90px] h-[140px] bg-[#FDF6F3] rounded-tr-2xl rounded-br-sm border-2 border-[#E5C1B8] border-l-0 relative overflow-hidden origin-bottom-left"
          animate={{ x: isCut ? 30 : 0, y: isCut ? 15 : 0, rotate: isCut ? 5 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Frosting Top */}
          <div className="absolute top-0 w-full h-[40px] bg-[#E3B7AD]">
            {/* Drips */}
            <svg className="absolute top-[39px] left-0 w-full h-[15px]" preserveAspectRatio="none" viewBox="0 0 100 20" fill="#E3B7AD">
              <path d="M0 0 Q 20 20 40 0 Q 60 15 80 0 Q 90 20 100 0 L 100 -10 L 0 -10 Z" />
            </svg>
          </div>
          {/* Cake Layers/Filling */}
          <div className="absolute top-[75px] w-full h-[14px] bg-[#F4D9D0]"></div>
          <div className="absolute top-[110px] w-full h-[14px] bg-[#F4D9D0]"></div>
          
          {/* Inner Cut Shadow (Visible on the slice edge) */}
          <div className="absolute left-0 top-0 w-[5px] h-full bg-[#E5C1B8] opacity-50 shadow-inner"></div>
        </motion.div>
      </div>

      {/* Cake Plate/Stand */}
      <div className="z-10 relative flex flex-col items-center mt-[-4px]">
        <div className="w-[330px] h-[30px] bg-[#8E706B] rounded-[50%] shadow-lg border-b-[6px] border-[#6C4C4A]"></div>
        <div className="w-[150px] h-[45px] bg-[#6C4C4A] rounded-b-3xl shadow-xl mt-[-15px]"></div>
        <div className="w-[190px] h-[20px] bg-[#5a3f3e] rounded-[50%] mt-[-10px] opacity-90 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"></div>
      </div>
    </div>
  );
};

export default function FinalCelebration({ onReplay }) {
  const [stage, setStage] = useState(0);
  const isDarkened = stage >= 4 && stage <= 5;

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#AD7466', '#F4D9D0', '#E3B7AD', '#6C4C4A', '#D4AF37', '#FFF9F5'] };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  // Progression handlers
  const handleStageNext = () => {
    if (stage === 0) setStage(1); 
    else if (stage === 1) {
      setStage(2); 
      setTimeout(() => setStage(3), 2000); 
    }
    else if (stage === 3) {
      setStage(4); 
      setTimeout(() => setStage(5), 4000); 
    }
    else if (stage === 5) {
      setStage(6); 
      setTimeout(() => setStage(7), 2000); 
    }
    else if (stage === 7) {
      setStage(8); 
      setTimeout(() => {
        setStage(9); 
        triggerConfetti();
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 ${isDarkened ? 'bg-[#3A2A28]' : 'bg-[#FBF5F1]'}`}>
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-1000 ${isDarkened ? 'opacity-20 from-[#AD7466] to-transparent' : 'opacity-100 from-[#E3B7AD]/40 to-transparent'}`} />
      
      {/* Central Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-1000 ${
        isDarkened ? 'w-[400px] h-[400px] bg-[#D4AF37]/20' : 'w-[600px] h-[600px] bg-[#F4D9D0]/60'
      }`} />

      {/* Top Titles */}
      <div className="absolute top-16 md:top-24 left-0 w-full text-center z-40 px-4">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="text-[#8E706B] font-serif italic text-xl mb-2">And now...</p>
              <h2 className="text-4xl md:text-6xl font-serif text-[#6C4C4A]">It's time to celebrate! 🎂</h2>
              <p className="text-[#AD7466] mt-4 tracking-wider uppercase text-sm">Everyone's here for one last special moment...</p>
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div key="stage1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl md:text-5xl font-serif text-[#6C4C4A]">Let's light the candles.</h2>
            </motion.div>
          )}
          {stage === 3 && (
            <motion.div key="stage3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className={`text-4xl md:text-6xl font-serif transition-colors duration-1000 text-[#6C4C4A]`}>
                Make A Wish ✨
              </h2>
              <p className={`mt-2 tracking-wider uppercase text-sm transition-colors duration-1000 text-[#AD7466]`}>
                A wish from the whole Hameed Family.
              </p>
            </motion.div>
          )}
          {stage === 4 && (
            <motion.div key="stage4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl md:text-5xl font-serif text-[#FDF6F3] mb-2">Ready?</h2>
            </motion.div>
          )}
          {stage === 5 && (
            <motion.div key="stage5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl md:text-5xl font-serif text-[#FDF6F3]">Blow out the candles...</h2>
            </motion.div>
          )}
          {stage >= 6 && stage <= 8 && (
            <motion.div key="stage7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-4xl md:text-6xl font-serif text-[#6C4C4A]">Let's Cut The Cake! 🎂</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Center Area */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-4xl min-h-[400px]">
        {/* The Cake */}
        {stage >= 1 && <Cake stage={stage} />}
      </div>

      {/* Bottom Controls / Text */}
      <div className="absolute bottom-16 md:bottom-24 w-full text-center z-40 px-4 h-24 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.button key="btn0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onClick={handleStageNext} className="bg-[#E3B7AD]/30 text-[#6C4C4A] border border-[#AD7466]/30 px-8 py-3 rounded-full font-serif text-lg hover:bg-[#E3B7AD]/50 transition-all shadow-md">
              Let's Cut The Cake ✨
            </motion.button>
          )}
          {stage === 1 && (
            <motion.button key="btn1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleStageNext} className="bg-[#E3B7AD]/30 text-[#6C4C4A] border border-[#AD7466]/30 px-8 py-3 rounded-full font-serif text-lg hover:bg-[#E3B7AD]/50 transition-all shadow-md">
              Light The Candles 🕯️
            </motion.button>
          )}
          {stage === 3 && (
            <motion.button key="btn3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleStageNext} className="bg-[#E3B7AD]/30 text-[#6C4C4A] border border-[#AD7466]/30 px-8 py-3 rounded-full font-serif text-lg hover:bg-[#E3B7AD]/50 transition-all shadow-md">
              Make A Wish ❤️
            </motion.button>
          )}
          {stage === 5 && (
            <motion.button key="btn5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleStageNext} className="bg-[#E3B7AD]/30 text-[#6C4C4A] border border-[#AD7466]/30 px-8 py-3 rounded-full font-serif text-lg hover:bg-[#E3B7AD]/50 transition-all shadow-md">
              Blow Out The Candles 🕯️
            </motion.button>
          )}
          {stage === 6 && (
            <motion.div key="text6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <p className="text-[#8E706B] font-serif text-xl">Wish made. ❤️</p>
            </motion.div>
          )}
          {stage === 7 && (
            <motion.button key="btn7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleStageNext} className="bg-[#E3B7AD]/30 text-[#6C4C4A] border border-[#AD7466]/30 px-8 py-3 rounded-full font-serif text-lg hover:bg-[#E3B7AD]/50 transition-all shadow-md">
              Cut The Cake 🔪
            </motion.button>
          )}
          {stage >= 9 && (
            <motion.div key="finalText" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col items-center">
               <p className="text-[#AD7466] font-serif italic text-lg md:text-xl mb-4">One cake. Many memories. One beautiful family.</p>
               <button onClick={() => setStage(0)} className="text-[#8E706B] text-sm uppercase tracking-widest border-b border-[#8E706B]/30 pb-1 hover:text-[#6C4C4A] transition-colors">
                 Celebrate Again ↻
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grand Finale Message Layer */}
      <AnimatePresence>
        {stage >= 9 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, delay: 2 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[#FBF5F1]/60 backdrop-blur-[2px]"
          >
            <div className="bg-[#FFF9F5]/90 border border-[#E5C1B8] p-10 md:p-16 rounded-3xl text-center shadow-2xl max-w-3xl mx-4 pointer-events-auto">
              <h1 className="text-4xl md:text-6xl font-serif text-[#6C4C4A] mb-4">HAPPY BIRTHDAY, SIYAMA ❤️</h1>
              <h2 className="text-xl md:text-3xl font-serif text-[#AD7466] italic mb-8">The heart of the Hameed Family.</h2>
              <p className="text-[#8E706B] md:text-lg mb-8 leading-relaxed px-4">
                May your days always be filled with love, happiness, good health and beautiful memories.
              </p>
              <div className="w-16 h-px bg-[#E5C1B8] mx-auto mb-8"></div>
              <p className="text-[#AD7466] uppercase tracking-widest text-sm mb-2">With all our love,</p>
              <p className="text-2xl font-serif text-[#6C4C4A]">The Hameed Family ❤️</p>
              
              <button 
                onClick={onReplay}
                className="mt-12 bg-[#E3B7AD]/20 text-[#6C4C4A] border border-[#AD7466]/20 px-8 py-3 rounded-full font-serif hover:bg-[#E3B7AD]/40 transition-all shadow-sm"
              >
                Back to Beginning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
