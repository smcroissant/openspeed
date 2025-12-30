'use client';

import { motion } from 'motion/react';

interface StartButtonProps {
  onClick: () => void;
  isRunning: boolean;
  phase: string;
}

export default function StartButton({ onClick, isRunning, phase }: StartButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {/* Main button */}
      <div
        className="relative w-44 h-44 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(145deg, rgba(39, 39, 42, 0.8), rgba(24, 24, 27, 0.9))',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05),
            0 20px 40px -10px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,
        }}
      >
        {/* Inner content */}
        <div className="text-center">
          {isRunning ? (
            <>
              <div className="text-lg font-semibold text-pink-400 uppercase tracking-wide">
                {phase === 'ping' && 'Ping'}
                {phase === 'download' && 'Download'}
                {phase === 'upload' && 'Upload'}
                {phase === 'complete' && 'Done'}
              </div>
              <p className="text-xs mt-1 text-zinc-500">
                tap to stop
              </p>
            </>
          ) : (
            <>
              <div
                className="text-3xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
              >
                GO
              </div>
              <p className="text-xs mt-1 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                start test
              </p>
            </>
          )}
        </div>
      </div>

      {/* Hover ring */}
      <div 
        className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #ec4899)',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />
    </motion.button>
  );
}
