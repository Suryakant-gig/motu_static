import React from 'react';
import { motion } from 'framer-motion';
import { playPopSound } from '../../utils/soundEffects';

export default function CuteButton({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon = null,
  type = 'button',
}) {
  const handleClick = (e) => {
    if (disabled) return;
    playPopSound(variant === 'primary' ? 520 : 440);
    if (onClick) onClick(e);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-rounded font-bold rounded-full transition-all duration-300 select-none shadow-kawaii disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg sm:text-xl gap-2.5",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-[#EFA2BB] to-[#FF8FA3] text-white hover:from-[#E78FA9] hover:to-[#FF7894] shadow-[0_8px_20px_rgba(239,162,187,0.45)] border-2 border-white/40",
    secondary: "bg-white text-[#49343D] hover:bg-[#FFF9EF] border-2 border-[#F8C8D8] shadow-sm",
    outline: "bg-transparent text-[#49343D] border-2 border-[#EFA2BB]/60 hover:bg-[#F8C8D8]/20",
    ghost: "bg-transparent text-[#7A626C] hover:text-[#49343D] hover:bg-black/5 shadow-none",
    lavender: "bg-gradient-to-r from-[#D9CAFF] to-[#C8B6FF] text-[#49343D] border-2 border-white/50",
  };

  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.04, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.96, y: 1 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
}

