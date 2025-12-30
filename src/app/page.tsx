'use client';

import { motion } from 'motion/react';
import { useSpeedTest } from '@/hooks/useSpeedTest';
import { useState, useEffect } from 'react';
import SpeedGauge from '@/components/SpeedGauge';
import ResultCard from '@/components/ResultCard';
import StartButton from '@/components/StartButton';
import ProgressBar from '@/components/ProgressBar';

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
}

// Icons
const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const PingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const JitterIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function Home() {
  const {
    phase,
    progress,
    currentSpeed,
    results,
    isRunning,
    startTest,
    stopTest,
    resetTest,
  } = useSpeedTest();

  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => setLocation(data))
      .catch(() => setLocation(null));
  }, []);

  const handleButtonClick = () => {
    if (isRunning) {
      stopTest();
    } else if (phase === 'complete') {
      resetTest();
    } else {
      startTest();
    }
  };

  const getGaugeLabel = () => {
    switch (phase) {
      case 'ping':
        return 'Latency';
      case 'download':
        return 'Download';
      case 'upload':
        return 'Upload';
      case 'complete':
        return 'Complete';
      default:
        return 'Ready';
    }
  };

  const getGaugeUnit = () => {
    return phase === 'ping' ? 'ms' : 'Mbps';
  };

  const getGaugeColor = () => {
    switch (phase) {
      case 'ping':
        return '#fbbf24';
      case 'download':
        return '#06b6d4';
      case 'upload':
        return '#ec4899';
      default:
        return '#06b6d4';
    }
  };

  const displaySpeed = phase === 'complete'
    ? results.download || 0
    : currentSpeed;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#09090b]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(236, 72, 153, 0.1), transparent),
              radial-gradient(ellipse 60% 40% at 20% 100%, rgba(139, 92, 246, 0.1), transparent)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            <span className="text-white">Open</span>
            <span className="text-cyan-400">Speed</span>
            <span className="sr-only"> - Free Internet Speed Test</span>
          </h1>
          <p className="text-zinc-500 text-sm tracking-wide">
            Test your internet connection speed
          </p>
          
          {/* Location */}
          {location && (
            <motion.div 
              className="flex items-center justify-center gap-2 mt-4 text-zinc-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LocationIcon />
              <span>
                {location.city}{location.region ? `, ${location.region}` : ''} — {location.isp || location.country}
              </span>
            </motion.div>
          )}
        </motion.header>

        {/* Main content area */}
        <motion.section
          aria-label="Speed test controls and results"
          className="flex flex-col items-center gap-12 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Speed gauge or Start button */}
          {phase !== 'complete' && (
            <div className="relative flex items-center justify-center min-h-[280px]" role="status" aria-live="polite">
              {isRunning ? (
                <SpeedGauge
                  speed={displaySpeed}
                  label={getGaugeLabel()}
                  unit={getGaugeUnit()}
                  color={getGaugeColor()}
                  isActive={isRunning}
                />
              ) : (
                <StartButton
                  onClick={handleButtonClick}
                  isRunning={isRunning}
                  phase={phase}
                />
              )}
            </div>
          )}

          {/* Progress bar */}
          {isRunning && (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProgressBar phase={phase} progress={progress} />
            </motion.div>
          )}

          {/* Results section */}
          {phase === 'complete' && (
            <>
              <h2 className="sr-only">Your Speed Test Results</h2>
              
              {/* Run Again button */}
              <button
                onClick={resetTest}
                className="group flex items-center justify-center gap-3 px-10 py-4 rounded-lg transition-colors duration-200 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-zinc-900 font-medium text-lg"
                aria-label="Run speed test again"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Run Again</span>
              </button>

              {/* Results grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mt-16" 
                role="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ResultCard
                  label="Download"
                  value={results.download}
                  unit="Mbps"
                  icon={<DownloadIcon />}
                  color="#06b6d4"
                  delay={0}
                />
                <ResultCard
                  label="Upload"
                  value={results.upload}
                  unit="Mbps"
                  icon={<UploadIcon />}
                  color="#ec4899"
                  delay={0.05}
                />
                <ResultCard
                  label="Ping"
                  value={results.ping}
                  unit="ms"
                  icon={<PingIcon />}
                  color="#fbbf24"
                  delay={0.1}
                />
                <ResultCard
                  label="Jitter"
                  value={results.jitter}
                  unit="ms"
                  icon={<JitterIcon />}
                  color="#a855f7"
                  delay={0.15}
                />
              </motion.div>
            </>
          )}

          {/* Stop button when running */}
          {isRunning && (
            <button
              onClick={stopTest}
              aria-label="Cancel speed test"
              className="px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700"
            >
              Cancel
            </button>
          )}
        </motion.section>

        {/* Footer */}
        <footer className="absolute bottom-6 text-center text-zinc-600 text-xs">
          <p>Free internet speed test — Check your download, upload, ping &amp; jitter</p>
        </footer>
      </div>
    </main>
  );
}
