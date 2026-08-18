import React from 'react';
import { motion } from 'framer-motion';

const MessageSection = ({ message }) => {
  const paragraphs = message.split('\n').filter(p => p.trim() !== '');

  return (
    <section id="letter" className="section-container relative z-10 py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl w-full mx-auto p-12 md:p-20 bg-[#FFF9F5] shadow-2xl relative overflow-hidden group"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
          boxShadow: '0 20px 50px rgba(108,76,74,0.15), inset 0 0 60px rgba(227,183,173,0.2)'
        }}
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#E5C1B8]/50" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#E5C1B8]/50" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#E5C1B8]/50" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#E5C1B8]/50" />
        
        <h2 className="text-4xl md:text-5xl font-serif text-[#6C4C4A] mb-16 text-center border-b border-[#E5C1B8] pb-8">A Letter From All of Us</h2>
        
        <div className="relative z-10 space-y-8 px-4 md:px-10">
          {paragraphs.map((paragraph, index) => {
            const isBold = paragraph.includes("**");
            const cleanText = paragraph.replace(/\*\*/g, '');
            
            return (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, duration: 1.2 }}
                className={`text-lg md:text-xl text-[#8E706B] leading-relaxed font-serif ${isBold ? 'font-bold mt-12 text-[#6C4C4A] text-right text-2xl' : ''}`}
              >
                {cleanText}
              </motion.p>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
