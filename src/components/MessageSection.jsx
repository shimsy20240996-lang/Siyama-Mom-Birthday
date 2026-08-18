import React from 'react';
import { motion } from 'framer-motion';

const MessageSection = ({ message }) => {
  const paragraphs = message.split('\n').filter(p => p.trim() !== '');

  return (
    <section id="message" className="section-container relative z-10 py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl w-full mx-auto p-10 md:p-16 rounded-3xl bg-[#FFF9F5]/80 backdrop-blur-md border border-[#E5C1B8] shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3B7AD]/30 rounded-full blur-[100px] group-hover:bg-[#F4D9D0]/50 transition-colors duration-700" />
        
        <h2 className="text-4xl md:text-5xl font-serif text-[#6C4C4A] mb-12 drop-shadow-sm text-center">To the woman who made my world beautiful...</h2>
        
        <div className="relative z-10 space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="text-xl md:text-2xl text-[#8E706B] leading-relaxed font-sans font-light"
            >
              {paragraph}
            </motion.p>
          ))}
          
          <motion.div 
            className="mt-12 pt-8 border-t border-[#E5C1B8]/50 text-right font-serif text-2xl italic text-[#AD7466]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: paragraphs.length * 0.2 + 0.5, duration: 1 }}
          >
            With all my love ❤️
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
