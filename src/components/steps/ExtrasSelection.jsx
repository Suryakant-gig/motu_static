import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, MessageCircleHeart, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function ExtrasSelection({
  selectedSnacks,
  personalMessage,
  onSelectSnacks,
  onChangeMessage,
  onNext,
  onBack,
}) {
  const snackOptions = [
    { title: 'You choose', emoji: '🥐', desc: 'Pick your favorites and surprise my tastebuds!' },
    { title: 'I choose', emoji: '🧇', desc: 'I have some delicious treats in mind already!' },
    { title: 'Together', emoji: '🍕', desc: 'We&apos;ll browse the menu side-by-side and share!' },
  ];

  const handleSelectSnack = (val) => {
    playSparkleSound();
    onSelectSnacks(val);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 06 • Sweet Touches
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        Let&apos;s make this date special.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs sm:text-sm text-[#7A626C] text-center mb-6"
      >
        A few little details to make everything just right 🍪
      </motion.p>

      {/* Snack Chooser */}
      <div className="w-full glass-panel rounded-3xl p-5 sm:p-6 mb-5 border-2 border-white/70 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Cookie className="w-4 h-4 text-[#EFA2BB]" />
          <h3 className="font-rounded font-bold text-base text-[#49343D]">
            Who chooses the snacks? <span className="text-[#D9658B]">*</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {snackOptions.map((opt) => {
            const isSelected = selectedSnacks === opt.title;

            return (
              <motion.div
                key={opt.title}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSnack(opt.title)}
                className={`cursor-pointer rounded-2xl p-3 text-center transition-all ${
                  isSelected
                    ? 'bg-white border-2 border-[#EFA2BB] shadow-kawaii ring-2 ring-[#F8C8D8]'
                    : 'bg-white/60 hover:bg-white border border-[#F8C8D8]/40'
                }`}
              >
                <div className="text-2xl mb-1">{opt.emoji}</div>
                <p className="font-rounded font-bold text-sm text-[#49343D]">
                  {opt.title}
                </p>
                <p className="text-[10px] text-[#7A626C] mt-0.5" dangerouslySetInnerHTML={{ __html: opt.desc }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Optional Personal Note */}
      <div className="w-full glass-panel rounded-3xl p-5 sm:p-6 mb-6 border-2 border-white/70 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageCircleHeart className="w-4 h-4 text-[#EFA2BB]" />
            <h3 className="font-rounded font-bold text-base text-[#49343D]">
              Anything you want me to know?
            </h3>
          </div>
          <span className="text-[11px] font-rounded text-[#A78E99] bg-[#FFF5F7] px-2 py-0.5 rounded-full">
            Optional
          </span>
        </div>

        <p className="text-xs text-[#7A626C] mb-3">
          Cravings, favorite songs to play in the car, or just a sweet little note... 💌
        </p>

        <textarea
          rows={3}
          value={personalMessage}
          onChange={(e) => onChangeMessage(e.target.value)}
          placeholder="E.g., I'd love chocolate desserts, play our favorite playlist, or bring that cute jacket! ❤️"
          className="w-full rounded-2xl bg-white/80 border border-[#F8C8D8] p-3 text-xs sm:text-sm text-[#49343D] placeholder-[#B8A3AD] focus:outline-none focus:ring-2 focus:ring-[#EFA2BB] focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between w-full max-w-md gap-4"
      >
        <CuteButton onClick={onBack} variant="secondary" size="md" icon={ArrowLeft}>
          Back
        </CuteButton>

        <CuteButton
          onClick={onNext}
          disabled={!selectedSnacks}
          variant="primary"
          size="md"
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedSnacks ? 'Review Our Date Plan ❤️' : 'Pick snack preference'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

