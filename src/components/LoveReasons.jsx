import React from 'react';
import { motion } from 'framer-motion';

const LoveReasons = ({ reasons }) => {
  return (
    <div id="reasons" className="section-container min-h-screen py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl px-4 z-10"
      >
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-20 text-white drop-shadow-md">
          Reasons I <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">Love You</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(244,114,182,0.15)"
              }}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-lg text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{reason.icon}</div>
              <h3 className="text-2xl font-serif text-white mb-4">{reason.title}</h3>
              <p className="text-gray-300 font-sans leading-relaxed font-light">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoveReasons;
