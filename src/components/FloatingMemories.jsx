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
    // Shuffle photos so their grid positions are randomized each time
    const shuffled = [...hameedFamilyConfig.photos].sort(() => Math.random() - 0.5);
    
    // We want ALL photos visible, without overlapping. 
    // We divide the screen into a strict grid.
    const total = shuffled.length;
    const cols = isMobile ? 4 : 6;
    const rows = Math.ceil(total / cols);
    
    const cellWidth = 100 / cols; // width in vw
    const cellHeight = 100 / rows; // height in vh

    return shuffled.map((photo, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Sizing: small enough to fit inside their cell without touching neighbors
      const baseSize = isMobile ? 55 : 115;
      const size = baseSize + (Math.random() * (isMobile ? 10 : 20) - (isMobile ? 5 : 10));
      
      // Calculate the exact center of this photo's dedicated grid cell
      const leftVw = (col * cellWidth) + (cellWidth / 2);
      const topVh = (row * cellHeight) + (cellHeight / 2);

      // Random rotation
      const rot = -8 + Math.random() * 17;

      // Restrict floating movement heavily so they NEVER leave their cell
      // Max movement: 8px mobile, 15px desktop
      const maxMove = isMobile ? 8 : 15;
      const moveX = (Math.random() - 0.5) * maxMove * 2;
      const moveY = (Math.random() - 0.5) * maxMove * 2;
      const rotDelta = (Math.random() - 0.5) * 8; // gentle sway

      const duration = 15 + Math.random() * 15;

      return {
        ...photo,
        id: i,
        size,
        leftVw,
        topVh,
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
              left: `${item.leftVw}vw`,
              top: `${item.topVh}vh`,
              width: `${item.size}px`,
              x: '-50%',
              y: '-50%',
              opacity: 1
            }}
            initial={{ rotate: item.rot }}
            animate={prefersReducedMotion ? {} : {
              x: [`calc(-50% + 0px)`, `calc(-50% + ${item.moveX}px)`, `calc(-50% + 0px)`],
              y: [`calc(-50% + 0px)`, `calc(-50% + ${item.moveY}px)`, `calc(-50% + 0px)`],
              rotate: [item.rot, item.rot + item.rotDelta, item.rot]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.35,
              zIndex: 50,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* Vintage Floating Polaroid Frame */}
            <div 
              className="bg-[#FFF9F5] p-1.5 pb-4 rounded-[2px] border border-[#E5C1B8]/60 shadow-[0_4px_15px_rgba(108,76,74,0.15)] relative"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            >
              <img 
                src={item.url} 
                alt="" 
                className="w-full h-auto object-contain opacity-100"
                loading="lazy"
              />
              
              {/* Subtle Caption on Hover */}
              <div className="absolute inset-x-0 bottom-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[#8E706B] text-[8px] md:text-[9px] font-serif text-center leading-tight px-1 drop-shadow-sm line-clamp-1">
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
