import React from 'react';
import { motion } from 'framer-motion';

const FamilyMessages = ({ messages }) => {
  return (
    <section id="family-messages" className="section-container relative z-10 py-32">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-20 text-[#6C4C4A] drop-shadow-sm">
          Messages From The Family
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ 
                y: -10, 
                rotate: index % 2 === 0 ? 1 : -1,
                boxShadow: "0 25px 50px -12px rgba(108, 76, 74, 0.15)" 
              }}
              className="bg-[#FFF9F5] p-8 pb-12 rounded-sm border border-[#E5C1B8] shadow-md relative group mx-2"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
              }}
            >
              {/* Fake Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E3B7AD]/60 rotate-2 backdrop-blur-sm shadow-sm" />

              <div className="text-[#AD7466] mb-6 flex justify-center">
                <span className="text-4xl font-serif">"</span>
              </div>
              
              <p className="text-[#8E706B] font-serif italic text-lg leading-relaxed text-center mb-8 px-2">
                {msg.message}
              </p>
              
              <div className="text-center mt-auto border-t border-[#E5C1B8]/40 pt-6">
                <h3 className="text-xl font-serif text-[#6C4C4A] mb-1">{msg.name}</h3>
                <p className="text-sm text-[#AD7466] uppercase tracking-widest">{msg.relationship}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyMessages;
