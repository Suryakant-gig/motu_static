import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { musicPlayer, playPopSound } from '../../utils/soundEffects';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    playPopSound(600);
    const state = musicPlayer.toggle();
    setIsPlaying(state);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        title={isPlaying ? "Mute romantic melody" : "Play romantic melody"}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-rounded font-bold transition-all shadow-kawaii ${
          isPlaying
            ? 'bg-white text-[#D9658B] border-2 border-[#EFA2BB] animate-pulse-gentle'
            : 'bg-white/80 backdrop-blur-md text-[#7A626C] hover:text-[#49343D] border border-white/60'
        }`}
      >
        <span className="flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#D9658B]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#7A626C]" />
          )}
        </span>
        <span className="hidden sm:inline">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>
        {isPlaying && (
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs"
          >
            🎵
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}

