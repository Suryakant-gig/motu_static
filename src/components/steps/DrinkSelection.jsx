import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, ArrowRight } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function DrinkSelection({ selectedDrink, onSelectDrink, onNext }) {
  const handleSelect = (drinkKey) => {
    playSparkleSound();
    onSelectDrink(drinkKey);
  };

  const drinkOptions = [
    {
      key: 'coffee',
      title: 'Coffee Date',
      emoji: '☕',
      tagline: 'Warm aromatic brews, cozy café corner & sweet latte art',
      highlights: ['Cappuccino / Mocha', 'Rich & cozy talks', 'Pastry pairing'],
      bgGradient: 'from-[#FFF0F4] to-[#FFF5F7]',
      accentColor: '#D9658B',
    },
    {
      key: 'chai',
      title: 'Chai Date',
      emoji: '🫖',
      tagline: 'Steaming ginger/elaichi cutting chai & endless banter',
      highlights: ['Hot spiced chai', 'Street-side warmth', 'Cozy vibes'],
      bgGradient: 'from-[#FFF7ED] to-[#FFF9EF]',
      accentColor: '#C68B59',
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
        Step 01 • The Sip
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        What should we sip together?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-[#7A626C] text-center mb-6"
      >
        Pick your favorite warm companion for our conversation 🐾
      </motion.p>

      {/* Drink Options Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {drinkOptions.map((item, idx) => {
          const isSelected = selectedDrink === item.key;

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(item.key)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-2 border-[#EFA2BB] shadow-kawaii-glow ring-4 ring-[#F8C8D8]/50'
                  : 'bg-white/70 hover:bg-white border-2 border-[#F8C8D8]/40 shadow-sm'
              }`}
            >
              {/* Selected Heart Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#EFA2BB] text-white flex items-center justify-center shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-white" />
                </motion.div>
              )}

              <div className="text-4xl sm:text-5xl mb-3">{item.emoji}</div>

              <h3 className="text-xl font-rounded font-bold text-[#49343D] mb-1">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#7A626C] mb-4 leading-relaxed">
                {item.tagline}
              </p>

              {/* Little detail pills */}
              <div className="flex flex-wrap gap-1.5">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-rounded px-2.5 py-1 rounded-full bg-[#FFF5F7] text-[#7A626C] border border-[#F8C8D8]/40"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center w-full"
      >
        <CuteButton
          onClick={onNext}
          disabled={!selectedDrink}
          variant="primary"
          size="lg"
          icon={ArrowRight}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {selectedDrink ? 'Continue to Location ❤️' : 'Select a drink to continue'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

