import React from 'react';
import { motion } from 'framer-motion';

export default function PandaFallback({ drinkMode = 'none', holdingHands = false }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <div className="relative flex items-center justify-center gap-4 sm:gap-8">
        {/* Panda 1 (Left) */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: holdingHands ? [0, 4, 0] : [0, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="relative w-36 h-36 sm:w-44 sm:h-44"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Ears */}
            <circle cx="50" cy="55" r="28" fill="#242026" />
            <circle cx="50" cy="55" r="16" fill="#F8C8D8" />
            <circle cx="150" cy="55" r="28" fill="#242026" />
            <circle cx="150" cy="55" r="16" fill="#F8C8D8" />

            {/* Body */}
            <ellipse cx="100" cy="155" rx="58" ry="42" fill="#FFFFFF" stroke="#EAE2E6" strokeWidth="2" />
            {/* Dark arms */}
            <ellipse cx="48" cy="148" rx="20" ry="26" fill="#242026" transform="rotate(20 48 148)" />
            <ellipse cx="152" cy="148" rx="20" ry="26" fill="#242026" transform="rotate(-20 152 148)" />

            {/* Head */}
            <ellipse cx="100" cy="100" rx="64" ry="54" fill="#FFFFFF" stroke="#EAE2E6" strokeWidth="2" />

            {/* Eye patches */}
            <ellipse cx="72" cy="98" rx="18" ry="24" fill="#242026" transform="rotate(-15 72 98)" />
            <ellipse cx="128" cy="98" rx="18" ry="24" fill="#242026" transform="rotate(15 128 98)" />

            {/* Eyes + catchlights */}
            <circle cx="75" cy="96" r="8" fill="#111115" />
            <circle cx="77" cy="94" r="3" fill="#FFFFFF" />
            <circle cx="73" cy="98" r="1.5" fill="#FFFFFF" />

            <circle cx="125" cy="96" r="8" fill="#111115" />
            <circle cx="127" cy="94" r="3" fill="#FFFFFF" />
            <circle cx="123" cy="98" r="1.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="56" cy="118" rx="12" ry="7" fill="#FFA0BC" opacity="0.8" />
            <ellipse cx="144" cy="118" rx="12" ry="7" fill="#FFA0BC" opacity="0.8" />

            {/* Snout & Nose */}
            <ellipse cx="100" cy="112" rx="20" ry="14" fill="#FFFFFF" />
            <ellipse cx="100" cy="108" rx="8" ry="6" fill="#242026" />
            <path d="M 96 116 Q 100 120 104 116" stroke="#242026" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>

          {/* Held Prop */}
          {drinkMode === 'coffee' && (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-2 right-4 text-2xl"
            >
              ☕
            </motion.div>
          )}
          {drinkMode === 'chai' && (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-2 right-4 text-2xl"
            >
              🫖
            </motion.div>
          )}
        </motion.div>

        {/* Floating Heart between them */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            y: [-2, 4, -2],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-3xl sm:text-4xl filter drop-shadow-md z-10"
        >
          💖
        </motion.div>

        {/* Panda 2 (Right) */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: holdingHands ? [0, -4, 0] : [0, 2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="relative w-36 h-36 sm:w-44 sm:h-44"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Ears */}
            <circle cx="50" cy="55" r="28" fill="#242026" />
            <circle cx="50" cy="55" r="16" fill="#F8C8D8" />
            <circle cx="150" cy="55" r="28" fill="#242026" />
            <circle cx="150" cy="55" r="16" fill="#F8C8D8" />

            {/* Cute flower on ear */}
            <circle cx="58" cy="40" r="8" fill="#EFA2BB" />
            <circle cx="58" cy="40" r="3" fill="#FFE494" />

            {/* Body */}
            <ellipse cx="100" cy="155" rx="58" ry="42" fill="#FFFFFF" stroke="#EAE2E6" strokeWidth="2" />
            <ellipse cx="48" cy="148" rx="20" ry="26" fill="#242026" transform="rotate(20 48 148)" />
            <ellipse cx="152" cy="148" rx="20" ry="26" fill="#242026" transform="rotate(-20 152 148)" />

            {/* Head */}
            <ellipse cx="100" cy="100" rx="64" ry="54" fill="#FFFFFF" stroke="#EAE2E6" strokeWidth="2" />

            {/* Eye patches */}
            <ellipse cx="72" cy="98" rx="18" ry="24" fill="#242026" transform="rotate(-15 72 98)" />
            <ellipse cx="128" cy="98" rx="18" ry="24" fill="#242026" transform="rotate(15 128 98)" />

            {/* Eyes + catchlights */}
            <circle cx="75" cy="96" r="8" fill="#111115" />
            <circle cx="77" cy="94" r="3" fill="#FFFFFF" />
            <circle cx="73" cy="98" r="1.5" fill="#FFFFFF" />

            <circle cx="125" cy="96" r="8" fill="#111115" />
            <circle cx="127" cy="94" r="3" fill="#FFFFFF" />
            <circle cx="123" cy="98" r="1.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="56" cy="118" rx="12" ry="7" fill="#FFA0BC" opacity="0.8" />
            <ellipse cx="144" cy="118" rx="12" ry="7" fill="#FFA0BC" opacity="0.8" />

            {/* Snout & Nose */}
            <ellipse cx="100" cy="112" rx="20" ry="14" fill="#FFFFFF" />
            <ellipse cx="100" cy="108" rx="8" ry="6" fill="#242026" />
            <path d="M 96 116 Q 100 120 104 116" stroke="#242026" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

