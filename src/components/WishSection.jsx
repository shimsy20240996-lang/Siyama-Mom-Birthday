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
    <div id="wish" className="section-container min-h-screen py-20 relative transition-colors duration-1000" style={{ backgroundColor: blownOut ? 'rgba(0,0,0,0.8)' : 'transparent' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-4 text-center z-10"
      >
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="cake"
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                Make a Wish, Mom 🎂
              </h2>
              <p className="text-xl text-pink-200 mb-16 italic">
                Close your eyes, make a wish, and blow out the candles...
              </p>

              <div className="relative w-64 h-64 mx-auto mb-16">
                {/* Cake Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-pink-300 rounded-lg shadow-xl border-b-8 border-pink-400">
                  <div className="absolute top-0 w-full h-4 bg-white/50 rounded-t-lg"></div>
                  {/* Decorative dots */}
                  <div className="absolute top-1/2 w-full flex justify-around px-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-white rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                {/* Candles */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 flex justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative w-3 h-12 bg-white rounded-sm border border-gray-200 shadow-sm">
                      <div className="absolute -top-1 left-0 w-full h-1 bg-red-400"></div>
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
                  className="btn-primary"
                >
                  Blow Out the Candles 🕯️
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
              <h2 className="text-3xl md:text-5xl font-serif text-pink-300 mb-8 leading-relaxed">
                {finalMessageLines[0]}
              </h2>
              {finalMessageLines[1] && (
                <p className="text-xl md:text-3xl font-sans text-white mt-8 tracking-wide">
                  {finalMessageLines[1]}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WishSection;
