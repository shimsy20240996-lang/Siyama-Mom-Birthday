import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from './config';
import ParticleBackground from './components/ParticleBackground';
import IntroScreen from './components/IntroScreen';
import BirthdayReveal from './components/BirthdayReveal';
import MessageSection from './components/MessageSection';
import MemoryGallery from './components/MemoryGallery';
import LoveReasons from './components/LoveReasons';
import WishSection from './components/WishSection';
import FinalCelebration from './components/FinalCelebration';
import MusicToggle from './components/MusicToggle';
import FloatingNavigation from './components/FloatingNavigation';
import './App.css';

function App() {
  const [stage, setStage] = useState('intro'); // intro, reveal, main, final

  useEffect(() => {
    // Add smooth scrolling style
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleOpenSurprise = () => {
    setStage('reveal');
  };

  const handleContinue = () => {
    setStage('main');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleCompleteWish = () => {
    setStage('final');
  };

  const handleReplay = () => {
    window.scrollTo(0, 0);
    setStage('intro');
  };

  return (
    <div className="app-container">
      <ParticleBackground />
      <MusicToggle musicUrl={birthdayConfig.music} />

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 1 }}>
            <IntroScreen onOpen={handleOpenSurprise} />
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1.5 }}>
            <BirthdayReveal onContinue={handleContinue} />
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <div id="home" className="pt-20">
              <FloatingNavigation />
              <BirthdayReveal onContinue={() => {
                document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
              }} />
              <MessageSection message={birthdayConfig.personalMessage} />
              <MemoryGallery photos={birthdayConfig.photos} />
              <LoveReasons reasons={birthdayConfig.reasons} />
              <WishSection finalMessage={birthdayConfig.finalMessage} onComplete={handleCompleteWish} />
            </div>
          </motion.div>
        )}

        {stage === 'final' && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <FinalCelebration onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
