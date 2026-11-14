import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sun, Sunset, Moon, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function TimeSelection({ selectedTime, onSelectTime, onNext, onBack }) {
  const handleSelect = (timeSlot) => {
    playSparkleSound();
    onSelectTime(timeSlot);
  };

  const timeSlots = [
    { time: '10:00 AM', period: 'Morning Coffee', icon: Sun, color: '#FFA726' },
    { time: '11:00 AM', period: 'Bright Sunshine', icon: Sun, color: '#FFB74D' },
    { time: '12:00 PM', period: 'Lunch & Chai', icon: Sun, color: '#FFA000' },
    { time: '1:00 PM', period: 'Afternoon Glow', icon: Sun, color: '#FB8C00' },
    { time: '2:00 PM', period: 'Quiet Afternoon', icon: Sun, color: '#F57C00' },
    { time: '3:00 PM', period: 'Cozy Siesta Hour', icon: Sun, color: '#EF6C00' },
    { time: '4:00 PM', period: 'Evening Tea Breeze', icon: Sunset, color: '#E91E63' },
    { time: '5:00 PM', period: 'Golden Hour Sunset', icon: Sunset, color: '#D81B60' },
    { time: '6:00 PM', period: 'Dusk & Fairy Lights', icon: Moon, color: '#8E24AA' },
    { time: '7:00 PM', period: 'Starlit Evening', icon: Moon, color: '#5E35B1' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 04 • The Time
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        What time should we meet?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs sm:text-sm text-[#7A626C] text-center mb-6"
      >
        Whenever you feel freshest and most relaxed ⏰
      </motion.p>

      {/* Time Slots Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {timeSlots.map((slot, idx) => {
          const isSelected = selectedTime === slot.time;
          const Icon = slot.icon;

          return (
            <motion.div
              key={slot.time}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + idx * 0.03 }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(slot.time)}
              className={`cursor-pointer rounded-2xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
                isSelected
                  ? 'bg-white border-2 border-[#EFA2BB] shadow-kawaii-glow ring-2 ring-[#F8C8D8]'
                  : 'bg-white/70 hover:bg-white border border-[#F8C8D8]/50 shadow-sm'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EFA2BB] text-white flex items-center justify-center shadow-sm">
                  <Heart className="w-3 h-3 fill-white" />
                </span>
              )}

              <Icon
                className="w-4 h-4 mb-1.5 transition-colors"
                style={{ color: isSelected ? '#EFA2BB' : slot.color }}
              />

              <span className="font-rounded font-extrabold text-sm sm:text-base text-[#49343D]">
                {slot.time}
              </span>

              <span className="text-[10px] font-semibold text-[#7A626C] mt-0.5">
                {slot.period}
              </span>
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
          disabled={!selectedTime}
          variant="primary"
          size="md"
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedTime ? `Next: Outfit (${selectedTime}) ❤️` : 'Select a time'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

