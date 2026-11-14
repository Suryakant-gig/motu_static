import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { fireHeartConfetti } from '../../utils/confetti';
import { playSparkleSound } from '../../utils/soundEffects';

export default function HeroScene({ onAccept, onMaybe }) {
  const [maybeClicked, setMaybeClicked] = useState(false);

  const handleYes = () => {
    fireHeartConfetti();
    playSparkleSound();
    onAccept('YES! OF COURSE ❤️');
  };

  const handleMaybe = () => {
    setMaybeClicked(true);
    playSparkleSound();
    // Allow reading the playful message for a moment before transitioning
    setTimeout(() => {
      onMaybe('Maybe... tell me more 🙈');
    }, 1400);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">
      {/* Cute script tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#F8C8D8] text-xs font-rounded font-semibold text-[#D9658B] shadow-sm mb-3"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#EFA2BB]" />
        <span>For someone very special</span>
        <Sparkles className="w-3.5 h-3.5 text-[#EFA2BB]" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-4xl sm:text-5xl font-rounded font-extrabold text-[#49343D] tracking-tight mb-2"
      >
        Hey, you! <span className="inline-block text-[#FF5C8A] animate-pulse-gentle">❤️</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-base sm:text-lg text-[#7A626C] font-rounded font-medium mb-6"
      >
        I have something special to ask you...
      </motion.p>

      {/* The Romantic Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="w-full glass-panel rounded-3xl p-6 sm:p-8 mb-6 shadow-kawaii-lg border-2 border-white/60 relative overflow-hidden"
      >
        <div className="absolute top-2 right-3 text-2xl opacity-40">✨</div>
        <div className="absolute bottom-2 left-3 text-2xl opacity-40">🌸</div>

        <p className="font-script text-2xl sm:text-3xl text-[#D9658B] mb-2">
          A little date with you?
        </p>
        <h2 className="text-xl sm:text-2xl font-rounded font-bold text-[#49343D] leading-snug">
          Would you go on a date with me?
        </h2>
        <p className="text-xs sm:text-sm text-[#7A626C] mt-2 font-body">
          (Good food, warm drinks, and lots of laughs guaranteed 🐼✨)
        </p>

        {/* Playful reaction feedback if 'Maybe' was tapped */}
        <AnimatePresence>
          {maybeClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-2xl bg-[#FFF9EF] border border-[#F8C8D8] text-[#D9658B] font-rounded font-semibold text-sm"
            >
              🙈 Hehe, no rush at all! Let&apos;s see what yummy things we can do... 🐾
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <CuteButton
          onClick={handleYes}
          size="lg"
          variant="primary"
          icon={Heart}
          className="w-full sm:w-auto"
        >
          YES! OF COURSE ❤️
        </CuteButton>

        <CuteButton
          onClick={handleMaybe}
          size="lg"
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Maybe... tell me more 🙈
        </CuteButton>
      </motion.div>
    </div>
  );
}

