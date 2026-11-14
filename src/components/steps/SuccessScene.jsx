import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { fireContinuousCelebration, fireHeartConfetti } from '../../utils/confetti';
import { playSuccessChime } from '../../utils/soundEffects';

export default function SuccessScene({ onReplay }) {
  useEffect(() => {
    // Fire celebratory confetti and play romantic fanfare
    fireHeartConfetti();
    fireContinuousCelebration();
    playSuccessChime();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center text-center">
      {/* Decorative Sparkle Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8C8D8] text-xs font-rounded font-bold text-[#D9658B] shadow-sm mb-4"
      >
        <Sparkles className="w-4 h-4 text-[#EFA2BB] animate-sparkle" />
        <span>Invitation Sealed with Love</span>
        <Sparkles className="w-4 h-4 text-[#EFA2BB] animate-sparkle" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-rounded font-black text-[#49343D] tracking-tight mb-2 drop-shadow-sm"
      >
        IT&apos;S A DATE! <span className="inline-block text-[#FF5C8A] animate-pulse-gentle">❤️</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-lg sm:text-xl font-rounded font-bold text-[#D9658B] mb-6"
      >
        I can&apos;t wait to spend some time with you.
      </motion.p>

      {/* Romantic Final Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full glass-panel rounded-3xl p-6 sm:p-8 mb-8 shadow-kawaii-lg border-2 border-white/80 relative overflow-hidden"
      >
        <div className="absolute top-2 right-4 text-3xl opacity-30">🌸</div>
        <div className="absolute bottom-3 left-4 text-3xl opacity-30">✨</div>

        <p className="font-script text-2xl sm:text-3xl text-[#D9658B] mb-3">
          My promise to you
        </p>

        <p className="text-base sm:text-lg font-rounded font-extrabold text-[#49343D] leading-relaxed mb-4">
          Now leave the rest to me. Just bring your beautiful smile.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-rounded font-semibold text-[#7A626C] bg-[#FFF5F7] p-3 rounded-2xl">
          <span>🐾 Bao & Mochi are already preparing the table! 🍵☕</span>
        </div>
      </motion.div>

      {/* Replay Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        <CuteButton
          onClick={onReplay}
          variant="secondary"
          size="md"
          icon={RotateCcw}
        >
          Replay our little story
        </CuteButton>
      </motion.div>
    </div>
  );
}

