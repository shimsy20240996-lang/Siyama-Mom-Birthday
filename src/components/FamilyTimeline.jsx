import React from 'react';
import { motion } from 'framer-motion';

const FamilyTimeline = ({ timeline }) => {
  return (
    <section id="our-story" className="section-container relative z-10 py-32">
      <div className="max-w-4xl mx-auto px-4 w-full relative">
        <h2 className="text-5xl md:text-6xl font-serif text-center mb-24 text-[#6C4C4A] drop-shadow-sm">
          Our Story
        </h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-[#E5C1B8] md:-translate-x-1/2" />
          
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex items-center mb-20 md:mb-32 group">
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute left-[16px] md:left-1/2 w-[9px] h-[9px] bg-[#AD7466] rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(173,116,102,0.5)] z-10 group-hover:scale-150 transition-transform duration-500"
                />

                {/* Content Container */}
                <div className={`w-full flex pl-12 md:pl-0 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`bg-[#FFF9F5]/90 backdrop-blur-sm p-8 rounded-xl border border-[#E5C1B8] shadow-lg w-full md:w-5/12 relative ${isEven ? 'md:mr-16' : 'md:ml-16'}`}
                    style={{
                      backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
                    }}
                  >
                    <h3 className="text-2xl md:text-3xl font-serif text-[#6C4C4A] mb-3">{item.period}</h3>
                    <p className="text-lg text-[#8E706B] font-sans font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FamilyTimeline;
