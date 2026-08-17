import React from 'react';
import { motion } from 'framer-motion';

const FloatingNavigation = () => {
  const navItems = [
    { label: '❤️ Home', href: '#home' },
    { label: '🌷 Message', href: '#message' },
    { label: '📸 Memories', href: '#memories' },
    { label: '✨ Reasons', href: '#reasons' },
    { label: '🎂 Birthday', href: '#wish' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto"
    >
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex justify-between md:justify-center items-center md:gap-8 shadow-xl overflow-x-auto no-scrollbar">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-white/80 hover:text-pink-300 transition-colors font-sans text-sm md:text-base whitespace-nowrap px-2"
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default FloatingNavigation;
