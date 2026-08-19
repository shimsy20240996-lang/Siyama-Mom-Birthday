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
    // Select 20 for desktop, 10 for mobile
    const count = isMobile ? 10 : 20;
    const selected = shuffled.slice(0, count);

    return selected.map((photo, i) => {
      // Width: 80px to 160px
      const size = 80 + Math.random() * 80;
      
      // No more transparency or heavy blur; just solid photos
      const depthOpacity = 1;
      const depthBlur = size < 100 ? 0.5 : 0; // barely any blur, just for tiny ones

      // Place anywhere on the page (0 to 90vw)
      const x = Math.random() * 90; // vw
      const y = Math.random() * 90; // vh

      // Random rotation -8 to +8
      const rot = -8 + Math.random() * 17;

      // Increased animation delta to move all around the page
      const moveX = (Math.random() - 0.5) * 150; // drift up to 75px left/right
      const moveY = (Math.random() - 0.5) * 200; // drift up to 100px up/down
      const rotDelta = (Math.random() - 0.5) * 15; // gentle sway

      // Duration 20-40s (slow and dreamy)
      const duration = 20 + Math.random() * 20;

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
              scale: 1.15,
              opacity: 1,
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
