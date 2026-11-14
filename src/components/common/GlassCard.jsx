import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  onClick = null,
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden ${hoverEffect ? 'cursor-pointer hover:border-[#EFA2BB]' : ''} ${className}`}
    >
      {/* Subtle top glare highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      {children}
    </motion.div>
  );
}

