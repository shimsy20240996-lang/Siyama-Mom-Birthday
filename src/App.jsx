import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hameedFamilyConfig } from './config';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import MessageSection from './components/MessageSection';
import FamilyMessages from './components/FamilyMessages';
import MemoryGallery from './components/MemoryGallery';
import FamilyTimeline from './components/FamilyTimeline';
import YouAreSection from './components/YouAreSection';
import FamilyTree from './components/FamilyTree';
import WishSection from './components/WishSection';
import FinalCelebration from './components/FinalCelebration';
import MusicToggle from './components/MusicToggle';
import FamilyVoiceWishes from './components/FamilyVoiceWishes';
import './App.css';

// Global audio instance so we can play it synchronously
const globalAudio = new Audio(hameedFamilyConfig.music);
globalAudio.loop = true;

function App() {
  const [showFinal, setShowFinal] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
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

  const wasMusicPlayingRef = useRef(false);
  const isVoiceActiveRef = useRef(false);

  const handleVoiceStart = () => {
    if (!isVoiceActiveRef.current) {
      wasMusicPlayingRef.current = isMusicPlaying;
    }
    isVoiceActiveRef.current = true;

    if (isMusicPlaying) {
      globalAudio.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleVoiceEnd = () => {
    isVoiceActiveRef.current = false;
    if (wasMusicPlayingRef.current) {
      globalAudio.play().catch(e => console.error("Audio play blocked:", e));
      setIsMusicPlaying(true);
      wasMusicPlayingRef.current = false;
    }
  };

  return (
    <div className="app-container relative">
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
        {hasEntered && !showFinal && (
          <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 1.5, delay: 0.5 }}>
            <div id="home" className="pt-10 relative z-10 pointer-events-none">
              <div className="pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                  className="text-center z-10 p-12 md:p-20 rounded-3xl bg-[#FFF9F5]/90 backdrop-blur-md border border-[#E5C1B8] shadow-2xl max-w-4xl mx-auto w-full relative overflow-hidden mt-10 mb-20"
                  style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
                >
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#E3B7AD]/40 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#F4D9D0]/40 rounded-full blur-[80px]" />

                  <h1 className="text-5xl md:text-7xl font-serif text-[#6C4C4A] mb-6 leading-tight relative z-10">
                    Happy Birthday,<br/> <span className="text-[#AD7466] text-6xl md:text-8xl mt-6 inline-block font-bold">Siyama ❤️</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-[#8E706B] font-sans tracking-wide mb-16 font-light relative z-10">
                    Today is all about you. Est. {hameedFamilyConfig.birthDate}
                  </p>
                </motion.div>

                <MessageSection message={hameedFamilyConfig.familyLetter} />
                <FamilyMessages messages={hameedFamilyConfig.familyMessages} />
                <FamilyVoiceWishes 
                  wishes={hameedFamilyConfig.familyVoiceWishes} 
                  onVoiceStart={handleVoiceStart}
                  onVoiceEnd={handleVoiceEnd}
                />
                <MemoryGallery photos={hameedFamilyConfig.photos} />
                <FamilyTimeline timeline={hameedFamilyConfig.timeline} />
                <YouAreSection words={hameedFamilyConfig.youAre} />
                <FamilyTree members={hameedFamilyConfig.familyMembers} />
                
                <WishSection finalMessage={hameedFamilyConfig.finalMessage} onComplete={handleCompleteWish} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinal && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <FinalCelebration onReplay={handleReplay} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
