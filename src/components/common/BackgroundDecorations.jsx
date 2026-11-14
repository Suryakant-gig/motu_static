import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundDecorations() {
  const hearts = [
    { id: 1, top: '8%', left: '6%', size: 'text-xl', delay: 0 },
    { id: 2, top: '18%', right: '8%', size: 'text-2xl', delay: 1.2 },
    { id: 3, top: '45%', left: '4%', size: 'text-lg', delay: 2.1 },
    { id: 4, top: '70%', right: '5%', size: 'text-2xl', delay: 0.8 },
    { id: 5, top: '85%', left: '10%', size: 'text-xl', delay: 1.8 },
  ];

  const sparkles = [
    { id: 1, top: '12%', left: '22%', delay: 0.5 },
    { id: 2, top: '25%', right: '18%', delay: 1.5 },
    { id: 3, top: '60%', left: '15%', delay: 2.3 },
    { id: 4, top: '80%', right: '20%', delay: 0.9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft radial background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F8C8D8]/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#E8E0FF]/35 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#FFF9EF]/60 rounded-full blur-3xl" />

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{ top: h.top, left: h.left, right: h.right }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + h.id,
            delay: h.delay,
            ease: 'easeInOut',
          }}
          className={`absolute ${h.size} text-[#EFA2BB]/40`}
        >
          ❤️
        </motion.div>
      ))}

      {/* Twinkling Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          style={{ top: s.top, left: s.left, right: s.right }}
          animate={{
            scale: [0.6, 1.2, 0.6],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 45, 90],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: s.delay,
            ease: 'easeInOut',
          }}
          className="absolute text-[#D9658B]/50 text-base"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}

