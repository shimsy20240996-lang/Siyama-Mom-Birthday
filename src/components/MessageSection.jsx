import React from 'react';
import { motion } from 'framer-motion';

const MessageSection = ({ message }) => {
  const paragraphs = message.split('\n').filter(p => p.trim() !== '');

  return (
    <div id="message" className="section-container min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-4"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-12 text-pink-300 leading-relaxed">
          To the woman who made my world beautiful...
        </h2>
        
        <div className="glass-card-light text-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20 text-6xl text-pink-400">
            &quot;
          </div>
          
          <div className="relative z-10 space-y-6 text-lg md:text-xl font-serif leading-relaxed">
            {paragraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-right font-serif text-xl italic text-pink-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: paragraphs.length * 0.3 + 0.5, duration: 1 }}
          >
            With all my love ❤️
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageSection;
