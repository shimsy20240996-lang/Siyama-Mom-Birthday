import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FamilyTree = ({ members }) => {
  const [activeMember, setActiveMember] = useState(null);

  // Filter out the center (Siyama) from the rest of the members to position them in an orbit/constellation
  const centerMember = members.find(m => m.position === 'center') || members[0];
  const orbitMembers = members.filter(m => m.position !== 'center');

  return (
    <section id="family-tree" className="section-container relative z-10 py-32 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,183,173,0.15)_0%,transparent_80%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-6 text-[#6C4C4A] drop-shadow-sm">
          The Hameed Family
        </h2>
        <p className="text-center text-[#8E706B] font-serif italic mb-20 text-xl">
          Constellations of Love
        </p>
        
        <div className="relative w-full max-w-3xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center">
          
          {/* Subtle Constellation Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(227,183,173,0.5))' }}>
            <motion.path 
              d="M 50% 50% L 20% 25% M 50% 50% L 80% 25% M 50% 50% L 20% 75% M 50% 50% L 80% 75%" 
              stroke="#E3B7AD" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Orbit Members */}
          {orbitMembers.map((member, index) => {
            // Calculate positions roughly matching the SVG lines
            let positionClasses = "";
            if (member.position === 'top-left') positionClasses = "top-[15%] left-[10%] md:left-[15%]";
            if (member.position === 'top-right') positionClasses = "top-[15%] right-[10%] md:right-[15%]";
            if (member.position === 'bottom-left') positionClasses = "bottom-[15%] left-[10%] md:left-[15%]";
            if (member.position === 'bottom-right') positionClasses = "bottom-[15%] right-[10%] md:right-[15%]";
            // Fallback for custom positions
            if (!positionClasses) positionClasses = `top-[${Math.random()*80}%] left-[${Math.random()*80}%]`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                className={`absolute ${positionClasses} flex flex-col items-center cursor-pointer group`}
                onClick={() => setActiveMember(member)}
              >
                {/* Glowing Star Node */}
                <div className="relative w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)] mb-3 group-hover:scale-150 transition-transform duration-300">
                  <div className="absolute inset-0 bg-[#F4D9D0] rounded-full animate-ping opacity-70" />
                </div>
                
                <div className="text-center bg-[#FFF9F5]/80 backdrop-blur-sm border border-[#E5C1B8]/50 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-serif text-[#6C4C4A] text-sm md:text-base font-semibold">{member.name}</p>
                  <p className="text-xs text-[#8E706B] uppercase tracking-wide">{member.role}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Center Member (Siyama) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="absolute flex flex-col items-center z-20 cursor-pointer group"
            onClick={() => setActiveMember(centerMember)}
          >
            {/* Center Star Glow */}
            <div className="relative w-8 h-8 bg-[#AD7466] rounded-full shadow-[0_0_30px_rgba(173,116,102,0.8)] mb-4 group-hover:scale-125 transition-transform duration-500">
              <div className="absolute inset-0 bg-[#E3B7AD] rounded-full animate-ping opacity-50 duration-1000" />
              <div className="absolute inset-1 bg-[#F4D9D0] rounded-full" />
            </div>
            
            <div className="text-center bg-[#FFF9F5] shadow-lg border border-[#E5C1B8] px-6 py-4 rounded-2xl">
              <p className="font-serif text-[#6C4C4A] text-xl md:text-2xl font-bold mb-1">{centerMember.name}</p>
              <p className="text-sm md:text-base text-[#AD7466] italic">{centerMember.role}</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDF6F3]/80 backdrop-blur-md p-4"
            onClick={() => setActiveMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-[#FFF9F5] p-8 rounded-2xl shadow-2xl border border-[#E5C1B8] text-center relative"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-[#8E706B] hover:text-[#6C4C4A]"
                onClick={() => setActiveMember(null)}
              >
                ✕
              </button>
              <div className="w-16 h-16 bg-[#F4D9D0] rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
                <span className="text-2xl font-serif text-[#AD7466]">
                  {activeMember.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-3xl font-serif text-[#6C4C4A] mb-2">{activeMember.name}</h3>
              <p className="text-[#AD7466] uppercase tracking-widest text-sm mb-6">{activeMember.role}</p>
              
              <p className="text-[#8E706B] font-serif italic text-lg leading-relaxed">
                {activeMember.position === 'center' 
                  ? "The beautiful heart of our family, whose love connects us all."
                  : "Forever connected, always family."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FamilyTree;
