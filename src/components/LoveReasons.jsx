import React from 'react';
import { motion } from 'framer-motion';

const LoveReasons = ({ reasons }) => {
  return (
    <div id="reasons" className="section-container min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl px-4"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-white">
          A Few Reasons I Love You ❤️
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 md:p-8 rounded-2xl hover:border-pink-400/50 transition-colors"
            >
              <h3 className="text-2xl font-serif text-pink-300 mb-4">{reason.title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-sans">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoveReasons;
