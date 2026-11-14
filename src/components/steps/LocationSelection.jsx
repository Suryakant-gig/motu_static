import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function LocationSelection({ selectedLocation, onSelectLocation, onNext, onBack }) {
  const handleSelect = (locName) => {
    playSparkleSound();
    onSelectLocation(locName);
  };

  const locations = [
    {
      name: 'Patia',
      emoji: '☕',
      tag: 'Café Hub & Modern Vibes',
      vibe: 'Cozy indoor spots, aesthetic coffee houses & dessert parlours',
    },
    {
      name: 'Jaydev Vihar',
      emoji: '🏙️',
      tag: 'Central & Vibrant',
      vibe: 'Lively atmosphere, great connectivity & fun places',
    },
    {
      name: 'Saheed Nagar',
      emoji: '🍰',
      tag: 'Foodie Street & Bakeries',
      vibe: 'Iconic street treats, warm bakeries & relaxed sit-outs',
    },
    {
      name: 'Nayapalli',
      emoji: '🌿',
      tag: 'Breezy & Relaxed',
      vibe: 'Peaceful corners, pleasant walkways & quiet ambiance',
    },
    {
      name: 'KIIT Square',
      emoji: '✨',
      tag: 'Youthful & Energetic',
      vibe: 'Buzzing eateries, quick sweet bites & vibrant crowd',
    },
    {
      name: 'Master Canteen',
      emoji: '🚂',
      tag: 'Heart of the City',
      vibe: 'Bhubaneswar city pulse, open plaza & heritage charm',
    },
    {
      name: 'Somewhere peaceful',
      emoji: '🌸',
      tag: 'Serene & Quiet',
      vibe: 'Less crowd, sweet breeze, where we can just talk for hours',
    },
    {
      name: 'You choose for us',
      emoji: '🥰',
      tag: 'Sweet Surrender',
      vibe: 'I trust your choice 100%! Pick whatever place you love best',
    },
    {
      name: 'Surprise me',
      emoji: '🎁',
      tag: 'Mystery Rendezvous',
      vibe: 'Keep it a little secret until the moment we get there ✨',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 02 • The Destination
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        Where should our little adventure begin?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7A626C] text-center mb-6"
      >
        <MapPin className="w-3.5 h-3.5 text-[#EFA2BB]" />
        <span>Bhubaneswar, Odisha • We&apos;ll pick the exact café together!</span>
      </motion.div>

      {/* Locations Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
        {locations.map((loc, idx) => {
          const isSelected = selectedLocation === loc.name;

          return (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.04 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(loc.name)}
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative text-left ${
                isSelected
                  ? 'bg-white border-2 border-[#EFA2BB] shadow-kawaii-glow ring-2 ring-[#F8C8D8]/60'
                  : 'bg-white/70 hover:bg-white border border-[#F8C8D8]/50 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{loc.emoji}</span>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-[#EFA2BB] text-white flex items-center justify-center shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </span>
                )}
              </div>

              <h3 className="font-rounded font-bold text-base text-[#49343D] mb-0.5">
                {loc.name}
              </h3>
              <p className="text-[11px] font-semibold text-[#D9658B] mb-1">
                {loc.tag}
              </p>
              <p className="text-xs text-[#7A626C] line-clamp-2 leading-relaxed">
                {loc.vibe}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between w-full max-w-md gap-4"
      >
        <CuteButton
          onClick={onBack}
          variant="secondary"
          size="md"
          icon={ArrowLeft}
        >
          Back
        </CuteButton>

        <CuteButton
          onClick={onNext}
          disabled={!selectedLocation}
          variant="primary"
          size="md"
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedLocation ? 'Next: Pick Date ❤️' : 'Select a location'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

