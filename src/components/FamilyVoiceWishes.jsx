import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Search, Volume2, Square } from 'lucide-react';

const Waveform = () => (
  <div className="flex items-center justify-center gap-1 h-8 my-3">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-[#AD7466] rounded-full"
        animate={{ height: ['4px', '24px', '4px'] }}
        transition={{ 
          duration: 0.6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 0.05 
        }}
      />
    ))}
  </div>
);

export default function FamilyVoiceWishes({ wishes }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [playingId, setPlayingId] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  // Extract unique relationships for filter
  const relationships = ["All", ...new Set(wishes.map(w => w.relationship))];
  
  const filteredWishes = wishes.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.relationship.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || w.relationship === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Ensure voices are loaded for SpeechSynthesis
  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoicesLoaded(true);
    };
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      // Some browsers load them immediately
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoicesLoaded(true);
      }
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopVoice = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
  };

  const playVoice = (member) => {
    // If clicking the currently playing member, just stop it
    if (playingId === member.name) {
      stopVoice();
      return;
    }
    
    stopVoice();

    if (member.status === 'loading') return;

    if (member.audioFile) {
      // Future-proofing: Play real audio file logic here
      console.log("Playing real audio file:", member.audioFile);
      setPlayingId(member.name);
      // Mock duration for real audio placeholder
      setTimeout(() => setPlayingId(null), 3000); 
    } else {
      // Fallback: AI Text-to-Speech via Web Speech API
      if (!window.speechSynthesis) {
        alert("Your browser does not support voice synthesis.");
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(member.wish);
      const allVoices = window.speechSynthesis.getVoices();
      
      // Attempt to pick a somewhat fitting voice
      const isFemale = member.voice && member.voice.includes('female');
      
      // Basic voice matching
      let selectedVoice = allVoices.find(v => 
        (isFemale ? (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Victoria')) 
                  : (v.name.includes('Male') || v.name.includes('Alex') || v.name.includes('Daniel'))) 
        && v.lang.includes('en')
      );
      
      // Fallback if specific gender not found
      if (!selectedVoice) {
        selectedVoice = allVoices.find(v => v.lang.includes('en')) || allVoices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Adjust pitch/rate slightly based on 'voice' tag to add variety
      if (member.voice) {
        if (member.voice.includes('deep')) utterance.pitch = 0.7;
        if (member.voice.includes('young')) {
          utterance.pitch = 1.2;
          utterance.rate = 1.1;
        }
      }
      
      utterance.onstart = () => setPlayingId(member.name);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#6C4C4A] mb-4">
            Wishes From The Hameed Family
          </h2>
          <p className="text-[#8E706B] font-serif text-lg md:text-xl italic mb-2">
            "Everyone has something special to say..."
          </p>
          <p className="text-[#AD7466] text-sm md:text-base opacity-80 uppercase tracking-widest">
            Tap a name and hear their birthday wish for Siyama.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-16 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AD7466] w-5 h-5 opacity-60" />
            <input 
              type="text" 
              placeholder="Find a family member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF9F5]/80 border border-[#E5C1B8] rounded-full py-3 pl-12 pr-6 text-[#6C4C4A] focus:outline-none focus:border-[#AD7466] shadow-[0_4px_15px_rgba(108,76,74,0.05)] placeholder-[#AD7466]/50 transition-all font-serif"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {relationships.map(rel => (
              <button
                key={rel}
                onClick={() => setActiveFilter(rel)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                  activeFilter === rel 
                    ? 'bg-[#AD7466] text-[#FFF9F5] border-[#AD7466] shadow-md' 
                    : 'bg-[#FFF9F5]/60 text-[#8E706B] border-[#E5C1B8] hover:bg-[#F2DCD4]'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredWishes.map((member) => {
              const isPlaying = playingId === member.name;
              const isLoading = member.status === 'loading';
              const isVappa = member.name === "Vappa";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ 
                    y: -4,
                    rotate: 1,
                    scale: 1.02,
                    boxShadow: "0 20px 40px -15px rgba(108, 76, 74, 0.15)"
                  }}
                  key={member.name}
                  className={`relative p-5 rounded-xl border transition-all duration-500 overflow-hidden ${
                    isPlaying 
                      ? 'bg-[#FDF6F3] border-[#AD7466]/40 shadow-[0_10px_30px_rgba(173,116,102,0.15)] ring-1 ring-[#AD7466]/20' 
                      : 'bg-[#FFF9F5]/80 border-[#E5C1B8]/60 shadow-sm hover:bg-[#FFF9F5]'
                  }`}
                  style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
                >
                  <div className="flex flex-col items-center text-center">
                    
                    {/* Avatar Placeholder */}
                    <div className="w-14 h-14 rounded-full bg-[#E3B7AD]/40 flex items-center justify-center border border-[#AD7466]/20 mb-3 shadow-inner">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover rounded-full p-0.5 opacity-90" />
                      ) : (
                        <span className="font-serif text-[#6C4C4A] text-xl opacity-80">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-[#6C4C4A] text-xl font-medium">{member.name}</h3>
                    <p className="text-[#AD7466] text-xs uppercase tracking-widest mt-1 mb-2">
                      {member.relationship}
                    </p>

                    {isVappa && (
                      <span className="text-[10px] text-[#AD7466] italic bg-[#E3B7AD]/20 px-3 py-1 rounded-full mb-3">
                        Her Forever Partner ❤️
                      </span>
                    )}

                    <div className="w-full border-t border-[#E5C1B8]/40 my-3"></div>

                    {/* Audio Controls & Display */}
                    <AnimatePresence mode="wait">
                      {isPlaying ? (
                        <motion.div
                          key="playing"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full flex flex-col items-center"
                        >
                          <div className="flex items-center gap-2 text-[#AD7466] text-sm font-medium mb-1">
                            <Volume2 size={16} className="animate-pulse" />
                            Speaking...
                          </div>
                          
                          <Waveform />
                          
                          <p className="font-serif text-[#8E706B] text-sm italic mt-2 line-clamp-3">
                            "{member.wish}"
                          </p>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); stopVoice(); }}
                            className="mt-4 flex items-center gap-2 text-xs text-[#8E706B] hover:text-[#6C4C4A] transition-colors"
                          >
                            <Square size={12} fill="currentColor" /> Stop
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => playVoice(member)}
                          disabled={isLoading}
                          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isLoading 
                              ? 'bg-[#E5C1B8]/20 text-[#AD7466]/50 cursor-not-allowed'
                              : 'bg-[#E3B7AD]/20 text-[#8E706B] hover:bg-[#E3B7AD]/40 hover:text-[#6C4C4A]'
                          }`}
                        >
                          {isLoading ? (
                            "Wish Loading..."
                          ) : (
                            <>
                              <Mic size={16} /> 
                              Hear My Wish
                            </>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                    
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center border-t border-[#E5C1B8]/40 pt-16">
          <h3 className="text-3xl md:text-4xl font-serif text-[#6C4C4A] mb-4">
            So many voices. One family. One heart.
          </h3>
          <p className="text-xl md:text-2xl font-serif text-[#AD7466] italic mb-2">
            Happy Birthday, Siyama ❤️
          </p>
          <p className="text-[#8E706B] uppercase tracking-widest text-sm">
            With love from the entire Hameed Family.
          </p>
        </div>
      </div>
    </section>
  );
}
