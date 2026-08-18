import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WishSection = ({ finalMessage, onComplete }) => {
  const [blownOut, setBlownOut] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleBlowOut = () => {
    setBlownOut(true);
    setTimeout(() => {
      setShowFinalMessage(true);
      setTimeout(() => {
        onComplete();
      }, 5000); // Transition to final celebration after reading
    }, 2000);
  };

  const finalMessageLines = finalMessage.split('\n');

  return (
    <div id="wish" className="section-container min-h-screen py-20 relative transition-colors duration-1000" style={{ backgroundColor: blownOut ? 'rgba(108,76,74,0.05)' : 'transparent' }}>
      
      {/* Rose Petals & Golden Particles (Only show when blown out) */}
      <AnimatePresence>
        {blownOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute w-4 h-4 bg-[#E3B7AD] rounded-full opacity-60 mix-blend-multiply blur-[1px]"
                style={{
                  borderRadius: '50% 0 50% 50%',
                  left: `${Math.random() * 100}%`,
                  top: '100%'
                }}
                animate={{
                  y: ['0vh', '-100vh'],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  ease: "easeOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`gold-${i}`}
                className="absolute w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%'
                }}
                animate={{
                  y: ['0vh', '-100vh'],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  ease: "easeOut",
                  delay: Math.random() * 1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-4 text-center z-10 relative"
      >
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="cake"
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif text-[#6C4C4A] mb-6">
                Make a Wish, Siyama 🎂
              </h2>
              <p className="text-xl text-[#8E706B] mb-16 italic">
                Close your eyes, make a wish, and blow out the candles...
              </p>

              <div className="relative w-64 h-64 mx-auto mb-16">
                {/* Cake Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#FFF9F5] rounded-lg shadow-xl border-b-8 border-[#E5C1B8]">
                  <div className="absolute top-0 w-full h-4 bg-[#F2DCD4] rounded-t-lg"></div>
                  {/* Decorative dots */}
                  <div className="absolute top-1/2 w-full flex justify-around px-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-[#E3B7AD] rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                {/* Candles */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 flex justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative w-3 h-12 bg-white rounded-sm border border-[#E5C1B8] shadow-sm">
                      <div className="absolute -top-1 left-0 w-full h-1 bg-[#AD7466]"></div>
                      {/* Flame */}
                      <AnimatePresence>
                        {!blownOut && (
                          <motion.div
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full blur-[2px]"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-orange-500 rounded-full"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {!blownOut && (
                <button 
                  onClick={handleBlowOut}
                  className="btn-primary flex items-center justify-center mx-auto"
                >
                  Make a Wish ✨
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="py-20"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-[#6C4C4A] mb-8 leading-relaxed">
                Happy Birthday, Siyama ❤️
              </h2>
              <p className="text-2xl md:text-4xl font-serif italic text-[#8E706B] mt-8 tracking-wide">
                The heart of the Hameed Family.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WishSection;
