import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Music4 } from 'lucide-react';

const MusicToggle = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white shadow-lg hover:bg-white/20 transition-all group flex items-center gap-3"
      title={isPlaying ? "Pause Music" : "Play Music"}
    >
      {isPlaying ? <Music className="animate-pulse text-pink-400" /> : <Music4 className="text-gray-300" />}
      <span className="hidden md:inline font-sans text-sm tracking-wide">
        Music {isPlaying ? 'ON' : 'OFF'}
      </span>
    </motion.button>
  );
};

export default MusicToggle;
