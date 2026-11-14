import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Heart, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { playSparkleSound } from '../../utils/soundEffects';

export default function DatePicker({ selectedDate, onSelectDate, onNext, onBack }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month navigation state
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of current month & total days
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    const chosen = new Date(year, month, day);
    chosen.setHours(0, 0, 0, 0);
    if (chosen < today) return; // Prevent past dates

    // Format as YYYY-MM-DD
    const isoString = chosen.toISOString().split('T')[0];
    playSparkleSound();
    onSelectDate(isoString);
  };

  // Quick preset dates
  const handleQuickPreset = (daysAhead) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    target.setHours(0, 0, 0, 0);
    setCurrentMonth(target);
    const isoString = target.toISOString().split('T')[0];
    playSparkleSound();
    onSelectDate(isoString);
  };

  // Format confirmation text
  const getConfirmationText = () => {
    if (!selectedDate) return null;
    const parts = selectedDate.split('-');
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setHours(0, 0, 0, 0);

    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const formatted = d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let relative = '';
    if (diffDays === 0) relative = 'Today! (So soon! 🥰)';
    else if (diffDays === 1) relative = 'Tomorrow! ✨';
    else relative = `In ${diffDays} days! 💖`;

    return { formatted, relative };
  };

  const confirmation = getConfirmationText();

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 03 • The Calendar
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        When should I reserve my time for you?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs sm:text-sm text-[#7A626C] text-center mb-5"
      >
        Pick any future day that works best for your schedule 🗓️
      </motion.p>

      {/* Quick Picks */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => handleQuickPreset(1)}
          className="text-xs font-rounded font-semibold px-3 py-1.5 rounded-full bg-white border border-[#F8C8D8] text-[#D9658B] hover:bg-[#FFF0F4] transition-all shadow-sm"
        >
          Tomorrow ✨
        </button>
        <button
          type="button"
          onClick={() => {
            const d = new Date();
            const daysUntilSaturday = (6 - d.getDay() + 7) % 7 || 7;
            handleQuickPreset(daysUntilSaturday);
          }}
          className="text-xs font-rounded font-semibold px-3 py-1.5 rounded-full bg-white border border-[#F8C8D8] text-[#D9658B] hover:bg-[#FFF0F4] transition-all shadow-sm"
        >
          This Weekend 🌸
        </button>
        <button
          type="button"
          onClick={() => handleQuickPreset(7)}
          className="text-xs font-rounded font-semibold px-3 py-1.5 rounded-full bg-white border border-[#F8C8D8] text-[#D9658B] hover:bg-[#FFF0F4] transition-all shadow-sm"
        >
          Next Week 💌
        </button>
      </div>

      {/* Interactive Calendar Card */}
      <div className="w-full glass-panel rounded-3xl p-5 sm:p-6 mb-6 shadow-kawaii border-2 border-white/70">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F8C8D8]/50">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={year === today.getFullYear() && month <= today.getMonth()}
            className="p-2 rounded-full hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[#49343D]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-rounded font-bold text-base sm:text-lg text-[#49343D]">
            {monthNames[month]} {year}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-white/80 transition-all text-[#49343D]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="text-[11px] font-rounded font-bold text-[#A78E99]">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 sm:h-9" />
          ))}

          {/* Days in month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(year, month, dayNum);
            thisDate.setHours(0, 0, 0, 0);
            const isPast = thisDate < today;

            const thisDateString = thisDate.toISOString().split('T')[0];
            const isSelected = selectedDate === thisDateString;
            const isToday = thisDate.getTime() === today.getTime();

            return (
              <motion.button
                key={dayNum}
                type="button"
                disabled={isPast}
                whileHover={!isPast ? { scale: 1.15 } : {}}
                whileTap={!isPast ? { scale: 0.95 } : {}}
                onClick={() => handleDayClick(dayNum)}
                className={`h-8 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-rounded font-bold transition-all relative ${
                  isSelected
                    ? 'bg-[#EFA2BB] text-white shadow-md ring-2 ring-[#F8C8D8]'
                    : isToday
                    ? 'bg-[#FFF0F4] text-[#D9658B] border border-[#EFA2BB]'
                    : isPast
                    ? 'text-[#C9B9C1] opacity-40 cursor-not-allowed'
                    : 'text-[#49343D] hover:bg-white/90'
                }`}
              >
                {dayNum}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 text-[9px]">❤️</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Date Confirmation Preview */}
        {confirmation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-3 border-t border-[#F8C8D8]/50 flex items-center gap-3 bg-[#FFF5F7] p-3 rounded-2xl"
          >
            <div className="text-2xl">🐼</div>
            <div className="text-left flex-1">
              <p className="text-xs text-[#7A626C] font-rounded">Date selected:</p>
              <p className="text-sm font-rounded font-bold text-[#D9658B]">
                {confirmation.formatted}
              </p>
              <p className="text-[11px] font-semibold text-[#7A626C]">
                {confirmation.relative}
              </p>
            </div>
          </motion.div>
        )}
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
          disabled={!selectedDate}
          variant="primary"
          size="md"
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedDate ? 'Next: Pick Time ❤️' : 'Pick a date'}
        </CuteButton>
      </motion.div>
    </div>
  );
}

