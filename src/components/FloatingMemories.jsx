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
    // Shuffle photos
    const shuffled = [...hameedFamilyConfig.photos].sort(() => Math.random() - 0.5);
    // Select 15 for desktop, 7 for mobile
    const count = isMobile ? 7 : 15;
    const selected = shuffled.slice(0, count);

    return selected.map((photo, i) => {
      // Small and beautiful sizes
      // Desktop: 50 to 90px
      // Mobile: 35 to 60px
      const size = isMobile ? 35 + Math.random() * 25 : 50 + Math.random() * 40;
      
      // Depth parameters based on size (transparent and soft)
      let depthBlur = 0;
      let depthOpacity = 0.35;
      
      // We categorize them into 3 depths relative to their size range
      const midPoint = isMobile ? 47 : 70;
      if (size < midPoint - 5) {
        depthBlur = 1.5;
        depthOpacity = 0.25 + Math.random() * 0.05;
      } else if (size < midPoint + 5) {
        depthBlur = 0.5;
        depthOpacity = 0.3 + Math.random() * 0.05;
      } else {
        depthBlur = 0;
        depthOpacity = 0.35 + Math.random() * 0.1; // max 0.45
      }

      // Bias position to edges to avoid covering text (0-20vw or 80-100vw)
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.random() * 20 : 80 + Math.random() * 20; // vw
      const y = Math.random() * 90; // vh

      // Random rotation -6 to +5
      const rot = -6 + Math.random() * 11;

      // Animation delta for slow floating
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
              width: `${item.size}px`,
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
              scale: 1.15,
              opacity: 0.9,
              filter: 'blur(0px)',
              zIndex: 50,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Vintage Floating Polaroid Frame */}
            <div 
              className="bg-[#FFF9F5] p-1 pb-3 rounded-[2px] border border-[#E5C1B8]/40 shadow-[0_4px_15px_rgba(108,76,74,0.1)] relative"
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
                <p className="text-[#8E706B] text-[6px] md:text-[8px] font-serif text-center leading-tight px-1 drop-shadow-sm">
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
