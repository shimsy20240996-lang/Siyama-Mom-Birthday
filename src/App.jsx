import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from './config';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import MessageSection from './components/MessageSection';
import MemoryGallery from './components/MemoryGallery';
import LoveReasons from './components/LoveReasons';
import WishSection from './components/WishSection';
import FinalCelebration from './components/FinalCelebration';
import MusicToggle from './components/MusicToggle';
import './App.css';

// Global audio instance so we can play it synchronously
const globalAudio = new Audio(birthdayConfig.music);
globalAudio.loop = true;

function App() {
  const [showFinal, setShowFinal] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Add smooth scrolling style
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Clean up
    return () => {
      globalAudio.pause();
    };
  }, []);

  const handleCompleteWish = () => {
    setShowFinal(true);
  };

  const handleReplay = () => {
    window.scrollTo(0, 0);
    setShowFinal(false);
    setHasEntered(false);
    setIsMusicPlaying(false);
    globalAudio.pause();
    globalAudio.currentTime = 0;
  };

  const handleEnter = () => {
    setHasEntered(true);
    setIsMusicPlaying(true); 
    // START MUSIC SYNCHRONOUSLY ON CLICK
    globalAudio.play().catch(e => console.error("Audio play blocked:", e));
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      globalAudio.pause();
    } else {
      globalAudio.play().catch(e => console.error("Audio play blocked:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="app-container">
      <ParticleBackground />
      <MusicToggle 
        isPlaying={isMusicPlaying}
        onToggle={toggleMusic}
      />

      <AnimatePresence mode="wait">
        {!hasEntered && (
          <motion.div key="welcome" exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }} transition={{ duration: 1.5 }}>
            <WelcomeScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasEntered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}>
            <div id="home" className="pt-10">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                className="text-center z-10 p-12 md:p-20 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgba(108,76,74,0.1)] max-w-4xl mx-auto w-full relative overflow-hidden mt-10 mb-20"
              >
                {/* Soft decorative blur orbs */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#E3B7AD]/40 rounded-full blur-[80px]" />
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#F4D9D0]/40 rounded-full blur-[80px]" />

                <h1 className="text-5xl md:text-7xl font-serif text-[#6C4C4A] mb-6 leading-tight relative z-10">
                  Happy Birthday,<br/> <span className="text-[#AD7466] text-6xl md:text-8xl mt-6 inline-block font-bold">Siyama ❤️</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#8E706B] font-sans tracking-wide mb-16 font-light relative z-10">
                  Today is all about you. Est. {birthdayConfig.birthDate}
                </p>
              </motion.div>

              <MessageSection message={birthdayConfig.personalMessage} />
              <MemoryGallery photos={birthdayConfig.photos} />
              <LoveReasons reasons={birthdayConfig.reasons} />
              <WishSection finalMessage={birthdayConfig.finalMessage} onComplete={handleCompleteWish} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFinal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <FinalCelebration onReplay={handleReplay} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
