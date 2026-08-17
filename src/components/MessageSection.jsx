import React from 'react';
import { motion } from 'framer-motion';

const MessageSection = ({ message }) => {
  const paragraphs = message.split('\n').filter(p => p.trim() !== '');

  return (
    <div id="message" className="section-container min-h-screen py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl w-full mx-auto p-10 md:p-16 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] group-hover:bg-pink-500/20 transition-colors duration-700" />
        
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-12 drop-shadow-md text-center">To the woman who made my world beautiful...</h2>
        
        <div className="relative z-10 space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="text-xl md:text-2xl text-gray-200 leading-relaxed font-sans font-light"
            >
              {paragraph}
            </motion.p>
          ))}
          
          <motion.div 
            className="mt-12 pt-8 border-t border-white/10 text-right font-serif text-2xl italic text-pink-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: paragraphs.length * 0.2 + 0.5, duration: 1 }}
          >
            With all my love ❤️
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageSection;
