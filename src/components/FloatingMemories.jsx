import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hameedFamilyConfig } from '../config';

export default function FloatingMemories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const floatingPhotos = useMemo(() => {
    // Shuffle photos using a stable seed approach or just random once on mount
    const shuffled = [...hameedFamilyConfig.photos].sort(() => Math.random() - 0.5);
    // Select 15 for desktop, 7 for mobile
    const count = isMobile ? 7 : 15;
    const selected = shuffled.slice(0, count);

    return selected.map((photo, i) => {
      // Width: 80px to 150px
      const size = 80 + Math.random() * 70;
      
      // Depth parameters based on size
      // Far: < 100 (blur 1.5px, opacity 0.25-0.3)
      // Mid: 100-130 (blur 0.5px, opacity 0.3-0.35)
      // Near: > 130 (blur 0px, opacity 0.35-0.45)
      let depthBlur = 0;
      let depthOpacity = 0.35;
      if (size < 100) {
        depthBlur = 1.5;
        depthOpacity = 0.25 + Math.random() * 0.05;
      } else if (size < 130) {
        depthBlur = 0.5;
        depthOpacity = 0.3 + Math.random() * 0.05;
      } else {
        depthBlur = 0;
        depthOpacity = 0.35 + Math.random() * 0.1;
      }

      // Avoid center width (25% to 75%). Let's bias to the left 0-25% and right 75-100%
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.random() * 25 : 75 + Math.random() * 20; // vw
      const y = Math.random() * 90; // vh

      // Random rotation -6 to +5
      const rot = -6 + Math.random() * 11;

      // Animation delta
      const moveX = (Math.random() - 0.5) * 40; // subtle left/right drift
      const moveY = (Math.random() - 0.5) * 60; // subtle up/down drift
      const rotDelta = (Math.random() - 0.5) * 8; // gentle sway

      // Duration 15-35s
      const duration = 15 + Math.random() * 20;

      return {
        ...photo,
        id: i,
        size,
        depthBlur,
        depthOpacity,
        x,
        y,
        rot,
        moveX,
        moveY,
        rotDelta,
        duration
      };
    });
  }, [isMobile]);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      <AnimatePresence>
        {floatingPhotos.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-auto group cursor-pointer"
            style={{
              left: `${item.x}vw`,
              top: `${item.y}vh`,
              width: `${isMobile ? item.size * 0.65 : item.size}px`,
              opacity: item.depthOpacity,
              filter: `blur(${item.depthBlur}px)`,
            }}
            initial={{ 
              y: 0, 
              x: 0, 
              rotate: item.rot 
            }}
            animate={prefersReducedMotion ? {} : {
              y: [0, item.moveY, 0],
              x: [0, item.moveX, 0],
              rotate: [item.rot, item.rot + item.rotDelta, item.rot]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.05,
              opacity: 0.85,
              filter: 'blur(0px)',
              zIndex: 50,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Vintage Floating Polaroid Frame */}
            <div 
              className="bg-[#FFF9F5] p-1.5 pb-4 rounded-[2px] border border-[#E5C1B8]/40 shadow-[0_4px_15px_rgba(108,76,74,0.1)] relative"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            >
              <img 
                src={item.url} 
                alt="" 
                className="w-full h-auto object-contain opacity-90"
                loading="lazy"
              />
              
              {/* Subtle Caption on Hover */}
              <div className="absolute inset-x-0 bottom-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[#8E706B] text-[8px] md:text-[9px] font-serif text-center leading-tight px-1 drop-shadow-sm">
                  {item.caption || "A beautiful memory ❤️"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
