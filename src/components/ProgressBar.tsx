'use client';

import type { TestPhase } from '@/hooks/useSpeedTest';

interface ProgressBarTranslations {
  ping: string;
  download: string;
  upload: string;
}

interface ProgressBarProps {
  phase: TestPhase;
  progress: number;
  translations?: ProgressBarTranslations;
}

const defaultTranslations: ProgressBarTranslations = {
  ping: 'Ping',
  download: 'Download',
  upload: 'Upload',
};

export default function ProgressBar({ 
  phase, 
  progress, 
  translations = defaultTranslations 
}: ProgressBarProps) {
  const t = translations;
  
  const phases: { key: TestPhase; label: string; color: string }[] = [
    { key: 'ping', label: t.ping, color: '#fbbf24' },
    { key: 'download', label: t.download, color: '#06b6d4' },
    { key: 'upload', label: t.upload, color: '#ec4899' },
  ];

  const currentPhaseIndex = phases.findIndex((p) => p.key === phase);
  const currentColor = phases[currentPhaseIndex]?.color || '#06b6d4';

  return (
    <div className="w-full">
      {/* Phase indicators */}
      <div className="flex justify-between mb-4">
        {phases.map((p, index) => {
          const isActive = p.key === phase;
          const isComplete = currentPhaseIndex > index || phase === 'complete';

          return (
            <div key={p.key} className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-300"
                style={{
                  background: isComplete ? p.color : isActive ? `${p.color}20` : 'rgba(255,255,255,0.05)',
                  color: isComplete ? '#09090b' : isActive ? p.color : 'rgba(255,255,255,0.3)',
                  border: isActive && !isComplete ? `1px solid ${p.color}50` : 'none',
                }}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className="text-xs transition-colors duration-300"
                style={{ color: isActive || isComplete ? p.color : 'rgba(255,255,255,0.3)' }}
              >
                {p.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-zinc-800/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: phase === 'idle' ? 0 : phase === 'complete' ? '100%' : `${progress}%`,
            background: currentColor,
          }}
        />
      </div>

      {/* Progress percentage */}
      {phase !== 'idle' && phase !== 'complete' && (
        <p
          className="text-center text-xs mt-3 font-medium"
          style={{ color: currentColor }}
        >
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
}
