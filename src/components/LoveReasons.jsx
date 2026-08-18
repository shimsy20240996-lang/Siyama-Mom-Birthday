import React from 'react';
import { motion } from 'framer-motion';

const LoveReasons = ({ reasons }) => {
  return (
    <section className="section-container relative z-10 py-32" id="reasons">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-20 text-[#6C4C4A] drop-shadow-sm">
          Why I Love You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E3B7AD] to-[#F4D9D0] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative h-full bg-white/50 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-[0_10px_30px_rgba(108,76,74,0.05)] flex flex-col items-center text-center">
                
                <div className="w-16 h-16 rounded-full bg-[#F4D9D0] flex items-center justify-center mb-6 shadow-inner text-3xl">
                  {reason.icon}
                </div>
                
                <h3 className="text-2xl font-serif text-[#6C4C4A] mb-4">{reason.title}</h3>
                <p className="text-[#8E706B] font-sans font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveReasons;
