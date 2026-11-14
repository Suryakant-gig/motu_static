import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function OutfitSelection({ selectedOutfit, onSelectOutfit, onNext, onBack }) {
  const handleSelect = (outfitTitle) => {
    playSparkleSound();
    onSelectOutfit(outfitTitle);
  };

  const outfitOptions = [
    {
      title: 'Casual and comfy',
      emoji: '👟',
      tag: 'Easygoing & Cozy',
      desc: 'Oversized hoodie, sweet tees, favorite sneakers & zero fuss',
      color: '#4ECDC4',
    },
    {
      title: 'A little dressed up',
      emoji: '👗',
      tag: 'Cute & Aesthetic',
      desc: 'Pretty dress, crisp collared shirt, accessorized & photo-ready',
      color: '#FF6B6B',
    },
    {
      title: 'Traditional',
      emoji: '🥻',
      tag: 'Grace & Elegance',
      desc: 'Beautiful kurti, ethnic colors & traditional charm',
      color: '#FFD166',
    },
    {
      title: 'Surprise me',
      emoji: '🎭',
      tag: 'Mystery Match',
      desc: 'Dress however you feel like, and let&apos;s see how we complement each other!',
      color: '#9B5DE5',
    },
    {
      title: 'No dress code',
      emoji: '🧸',
      tag: 'Just Yourself',
      desc: 'Wear whatever makes you smile and feel most comfortable. You look stunning in everything anyway ❤️',
      color: '#F15BB5',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 05 • The Outfit
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        What should we wear?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs sm:text-sm text-[#7A626C] text-center mb-6"
      >
        Whatever makes you feel happiest and most confident 👗👔
      </motion.p>

      {/* Outfit Options */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
        {outfitOptions.map((opt, idx) => {
          const isSelected = selectedOutfit === opt.title;

          return (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + idx * 0.04 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(opt.title)}
              className={`cursor-pointer rounded-2xl p-4.5 transition-all duration-300 relative text-left ${
                isSelected
                  ? 'bg-white border-2 border-[#EFA2BB] shadow-kawaii-glow ring-2 ring-[#F8C8D8]'
                  : 'bg-white/70 hover:bg-white border border-[#F8C8D8]/50 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{opt.emoji}</span>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-[#EFA2BB] text-white flex items-center justify-center shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </span>
                )}
              </div>

              <h3 className="font-rounded font-bold text-base text-[#49343D] mb-0.5">
                {opt.title}
              </h3>

              <span className="inline-block text-[10px] font-semibold text-[#D9658B] px-2 py-0.5 rounded-full bg-[#FFF0F4] mb-1.5">
                {opt.tag}
              </span>

              <p className="text-xs text-[#7A626C] leading-relaxed">
                {opt.desc}
              </p>
            </motion.div>
          );
        })}
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
          disabled={!selectedOutfit}
          variant="primary"
          size="md"
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedOutfit ? 'Next: Little Extras ❤️' : 'Select an outfit'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

