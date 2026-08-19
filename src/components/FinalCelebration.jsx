import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Cake = ({ stage }) => {
  const isLit = stage >= 2 && stage < 5;
  const isCut = stage >= 7;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mt-12 mb-16">
      {/* Knife Animation */}
      <AnimatePresence>
        {stage === 7 && (
          <motion.div
            initial={{ x: 100, y: -100, opacity: 0, rotate: 45 }}
            animate={{ x: 0, y: -20, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 right-10 z-30 drop-shadow-lg"
          >
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 0 C25 0 20 40 20 80 C20 85 25 90 30 90 C35 90 40 85 40 80 C40 40 35 0 35 0 Z" fill="#F4D9D0"/>
              <path d="M28 85 L32 85 L32 115 L28 115 Z" fill="#AD7466"/>
              <circle cx="30" cy="115" r="5" fill="#AD7466"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cake Stand */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 md:w-60 h-8 bg-[#8E706B] rounded-[50%] z-0 drop-shadow-md"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-6 bg-[#6C4C4A] rounded-b-xl z-0"></div>

      {/* Cake Base */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 md:w-56 h-24 md:h-32 bg-[#FDF6F3] rounded-3xl z-10 border-b-4 border-[#E5C1B8] shadow-inner"
        animate={isCut ? { x: "-55%" } : { x: "-50%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute top-1/2 left-0 w-full h-2 bg-[#F4D9D0] opacity-60"></div>
      </motion.div>

      {/* Cut Slice (Only visible when cut) */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 md:w-56 h-24 md:h-32 bg-[#FDF6F3] rounded-3xl z-10 border-b-4 border-[#E5C1B8] shadow-inner"
        initial={{ opacity: 0, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
        animate={isCut ? { opacity: 1, x: "-40%", y: 10, rotate: 2 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute top-1/2 left-0 w-full h-2 bg-[#F4D9D0] opacity-60"></div>
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#E3B7AD] opacity-30 border-r border-[#AD7466]"></div>
      </motion.div>

      {/* Icing/Frosting Drips */}
      <motion.div 
        className="absolute bottom-28 md:bottom-[8.5rem] left-1/2 -translate-x-1/2 w-48 md:w-60 z-20"
        animate={isCut ? { x: "-55%" } : { x: "-50%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 10 30 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10 L 200 0 L 0 0 Z" fill="#E3B7AD"/>
          <path d="M10 10 Q 20 40 30 10" fill="#E3B7AD"/>
          <path d="M50 10 Q 60 35 70 10" fill="#E3B7AD"/>
          <path d="M110 10 Q 120 45 130 10" fill="#E3B7AD"/>
          <path d="M160 10 Q 170 30 180 10" fill="#E3B7AD"/>
        </svg>
      </motion.div>

      {/* Candles */}
      <motion.div 
        className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-20"
        animate={isCut ? { x: "-55%", opacity: 0 } : { x: "-50%", opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                  exit={{ opacity: 0, scale: 0, y: -10 }}
                  transition={{ 
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.1, delay: i * 0.2 },
                    rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                  }}
                  className="w-3 h-4 bg-gradient-to-t from-[#D4AF37] to-[#FFF9F5] rounded-[50%] mb-1 shadow-[0_0_10px_#D4AF37]"
                />
              )}
            </AnimatePresence>
            
            {/* Smoke (after blowing) */}
            <AnimatePresence>
              {stage === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 0.5, y: -20, scale: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute -top-4 w-2 h-2 bg-gray-300 rounded-full blur-[2px]"
                />
              )}
            </AnimatePresence>

            {/* Candle Body */}
            <div className="w-2 h-8 bg-[#FFF9F5] border border-[#E5C1B8] rounded-t-sm relative overflow-hidden">
              <div className="absolute top-2 w-full h-1 bg-[#AD7466] rotate-12"></div>
              <div className="absolute top-5 w-full h-1 bg-[#AD7466] rotate-12"></div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function FinalCelebration({ onReplay, wishes = [] }) {
  const [stage, setStage] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const isDarkened = stage >= 4 && stage <= 5;

  useEffect(() => {
    // Pick ~8 random avatars from wishes
    const membersWithPhotos = wishes.filter(w => w.name && w.name !== 'Rasmiya');
    const shuffled = [...membersWithPhotos].sort(() => 0.5 - Math.random());
    setAvatars(shuffled.slice(0, 8));
  }, [wishes]);

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
    if (stage === 0) setStage(1); // To unlit
    else if (stage === 1) {
      setStage(2); // Light candles
      setTimeout(() => setStage(3), 2000); // Wait for lit
    }
    else if (stage === 3) {
      setStage(4); // Make a wish (dark)
      setTimeout(() => setStage(5), 4000); // Wait 4s, go to Blow
    }
    else if (stage === 5) {
      setStage(6); // Smoke out
      setTimeout(() => setStage(7), 2000); // Ready to cut
    }
    else if (stage === 7) {
      setStage(8); // Cutting
      setTimeout(() => {
        setStage(9); // Celebration
        triggerConfetti();
      }, 1500);
    }
  };

  // Positions for 8 avatars around the cake
  const getAvatarStyle = (index) => {
    const radius = window.innerWidth < 768 ? 130 : 220;
    const angle = (index / 8) * (2 * Math.PI) - (Math.PI / 2);
    const x = Math.cos(angle) * radius;
    // Compress Y axis slightly to make an oval around the cake
    const y = Math.sin(angle) * (radius * 0.7);
    
    return { x, y };
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
        
        {/* Avatars */}
        {stage >= 1 && avatars.map((avatar, i) => {
          const { x, y } = getAvatarStyle(i);
          const isCelebrating = stage >= 9;
          
          return (
            <motion.div
              key={avatar.name}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: isCelebrating ? 1.1 : 1,
                x, 
                y,
                rotate: isCelebrating ? (i % 2 === 0 ? 5 : -5) : 0
              }}
              transition={{ 
                opacity: { duration: 1, delay: i * 0.1 },
                x: { duration: 1, type: "spring" },
                y: { duration: 1, type: "spring" },
                scale: { duration: 0.5 },
                rotate: { duration: 0.5, yoyo: Infinity }
              }}
              className="absolute top-1/2 left-1/2 -mt-6 -ml-6 md:-mt-8 md:-ml-8 flex flex-col items-center"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#E5C1B8] flex items-center justify-center shadow-lg transition-all duration-1000 ${isDarkened ? 'opacity-50' : 'opacity-100'} ${isCelebrating ? 'shadow-[#D4AF37]/40 ring-4 ring-[#F4D9D0]' : 'bg-[#FFF9F5]'}`}>
                {avatar.photo ? (
                  <img src={avatar.photo} alt={avatar.name} className="w-full h-full object-cover rounded-full p-0.5" />
                ) : (
                  <span className="font-serif text-[#6C4C4A] text-xl">{avatar.name.charAt(0)}</span>
                )}
              </div>
            </motion.div>
          );
        })}

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
