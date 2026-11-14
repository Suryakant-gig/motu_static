import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ProgressBar({ currentStep = 1, totalSteps = 7, onStepClick = null }) {
  // Steps: 1 to 7
  const steps = [
    { num: '01', name: 'Drink' },
    { num: '02', name: 'Location' },
    { num: '03', name: 'Date' },
    { num: '04', name: 'Time' },
    { num: '05', name: 'Outfit' },
    { num: '06', name: 'Extras' },
    { num: '07', name: 'Plan' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-3 select-none">
      <div className="flex items-center justify-between relative">
        {/* Background connecting bar */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#F8C8D8]/50 rounded-full z-0" />

        {/* Animated active progress bar */}
        <motion.div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-gradient-to-r from-[#EFA2BB] to-[#FF8FA3] rounded-full z-0"
          initial={false}
          animate={{
            width: `${((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 92}%`,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {steps.map((s, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={s.num}
              onClick={() => {
                if (isCompleted && onStepClick) {
                  onStepClick(stepNumber);
                }
              }}
              className={`relative z-10 flex flex-col items-center group ${
                isCompleted && onStepClick ? 'cursor-pointer' : ''
              }`}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.18 : 1,
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-rounded font-bold transition-all duration-300 shadow-sm ${
                  isActive
                    ? 'bg-[#EFA2BB] text-white ring-4 ring-[#F8C8D8]/60 shadow-[0_0_12px_rgba(239,162,187,0.6)]'
                    : isCompleted
                    ? 'bg-[#FFF0F4] text-[#D9658B] border-2 border-[#EFA2BB]'
                    : 'bg-white text-[#A78E99] border border-[#F8C8D8]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  s.num
                )}
              </motion.div>

              {/* Step name (shown on sm+ screens) */}
              <span
                className={`hidden sm:block text-[11px] font-rounded font-semibold mt-1 transition-colors ${
                  isActive
                    ? 'text-[#49343D] font-bold'
                    : isCompleted
                    ? 'text-[#D9658B]'
                    : 'text-[#B8A3AD]'
                }`}
              >
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

