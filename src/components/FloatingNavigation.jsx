import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingNavigation = () => {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#home', '#message', '#memories', '#reasons', '#wish'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section.replace('#', ''));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActive(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Message', href: '#message' },
    { label: 'Memories', href: '#memories' },
    { label: 'Reasons', href: '#reasons' },
    { label: 'Birthday', href: '#wish' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      <div className="bg-white/95 backdrop-blur-md border border-gray-100/20 rounded-full px-6 md:px-8 py-3.5 flex justify-between md:justify-center items-center gap-6 md:gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {navItems.map((item, index) => {
          const isActive = active === item.href;
          return (
            <a
              key={index}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={`relative text-sm font-semibold transition-colors px-1 pb-1 whitespace-nowrap ${
                isActive ? 'text-[#1a1f2e]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4f46e5] rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default FloatingNavigation;
