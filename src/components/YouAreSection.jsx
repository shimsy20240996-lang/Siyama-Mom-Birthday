import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const YouAreSection = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="section-container relative z-10 py-40 min-h-[60vh] flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,183,173,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="text-center w-full"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#6C4C4A] mb-8 tracking-widest uppercase text-opacity-80">
          You Are...
        </h2>
        
        <div className="h-32 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.h3
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-5xl md:text-8xl font-serif text-[#AD7466] italic drop-shadow-sm absolute"
            >
              {words[index]}
            </motion.h3>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default YouAreSection;
