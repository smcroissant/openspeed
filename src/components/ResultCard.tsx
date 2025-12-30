'use client';

import { motion } from 'motion/react';

interface ResultCardProps {
  label: string;
  value: number | null;
  unit: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export default function ResultCard({
  label,
  value,
  unit,
  icon,
  color,
  delay = 0,
}: ResultCardProps) {
  return (
    <motion.div
      className="p-4 md:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex flex-col items-center text-center gap-2">
        {/* Icon */}
        <div style={{ color: `${color}90` }}>
          {icon}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span
            className="text-2xl md:text-3xl font-semibold text-white"
          >
            {value !== null ? value.toFixed(value < 10 ? 1 : 0) : '—'}
          </span>
          <span className="text-xs text-zinc-500">
            {unit}
          </span>
        </div>

        {/* Label */}
        <p className="text-xs text-zinc-500 uppercase tracking-wide">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
