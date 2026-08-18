import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Music4 } from 'lucide-react';

const MusicToggle = ({ musicUrl, isPlaying, onToggle }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio 
        ref={audioRef}
        src={musicUrl || "/Siyama-Mom-Birthday/happy-birthday.mp3"} 
        loop
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white shadow-lg hover:bg-white/20 transition-all group flex items-center gap-3"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Music className="animate-pulse text-pink-400" /> : <Music4 className="text-gray-300" />}
        <span className="hidden md:inline font-sans text-sm tracking-wide">
          Music {isPlaying ? 'ON' : 'OFF'}
        </span>
      </motion.button>
    </>
  );
};

export default MusicToggle;
