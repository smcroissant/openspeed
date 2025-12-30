'use client';

import { motion } from 'motion/react';

interface StartButtonTranslations {
  start: string;
  startHint: string;
  tapToStop: string;
  phases: {
    ping: string;
    download: string;
    upload: string;
    complete: string;
    done: string;
  };
}

interface StartButtonProps {
  onClick: () => void;
  isRunning: boolean;
  phase: string;
  translations?: StartButtonTranslations;
}

const defaultTranslations: StartButtonTranslations = {
  start: 'GO',
  startHint: 'start test',
  tapToStop: 'tap to stop',
  phases: {
    ping: 'Ping',
    download: 'Download',
    upload: 'Upload',
    complete: 'Complete',
    done: 'Done',
  },
};

export default function StartButton({ 
  onClick, 
  isRunning, 
  phase, 
  translations = defaultTranslations 
}: StartButtonProps) {
  const t = translations;
  
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
                {phase === 'ping' && t.phases.ping}
                {phase === 'download' && t.phases.download}
                {phase === 'upload' && t.phases.upload}
                {phase === 'complete' && t.phases.done}
              </div>
              <p className="text-xs mt-1 text-zinc-500">
                {t.tapToStop}
              </p>
            </>
          ) : (
            <>
              <div
                className="text-3xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
              >
                {t.start}
              </div>
              <p className="text-xs mt-1 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {t.startHint}
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
