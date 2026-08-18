import React from 'react';
import { motion } from 'framer-motion';
import { Music, Music4 } from 'lucide-react';
import ReactPlayer from 'react-player';

const MusicToggle = ({ musicUrl, isPlaying, onToggle }) => {
  return (
    <>
      {/* Hidden YouTube Player (Cannot use display:none or YouTube will block it) */}
      <div className="absolute opacity-0 pointer-events-none w-[10px] h-[10px] overflow-hidden -z-50">
        <ReactPlayer 
          url={musicUrl || "https://www.youtube.com/watch?v=_z-1fTlSDF0"} 
          playing={isPlaying} 
          loop={true}
          volume={0.5}
          width="10px"
          height="10px"
        />
      </div>

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
