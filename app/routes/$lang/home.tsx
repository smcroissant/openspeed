import { motion } from 'motion/react';
import { useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';
import { useSpeedTest } from '~/hooks/useSpeedTest';
import SpeedGauge from '~/components/SpeedGauge';
import ResultCard from '~/components/ResultCard';
import StartButton from '~/components/StartButton';
import ProgressBar from '~/components/ProgressBar';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import ServerSelector, { type ServerOption } from '~/components/ServerSelector';
import { getDictionary, type Locale, type Dictionary } from '~/lib/i18n';

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
}

interface ServerInfo {
  server: {
    provider: string;
    region: {
      code: string;
      city: string;
      country: string;
      flag: string;
    };
    environment: string;
  };
}

// Icons
const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
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
  const context = useOutletContext<{ lang: Locale; dict: Dictionary } | null>();
  
  // Fallback to default if context is not available
  const lang = context?.lang || 'en';
  const t = context?.dict || getDictionary('en');

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
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerOption | null>(null);
  const [testedServer, setTestedServer] = useState<ServerOption | null>(null);

  useEffect(() => {
    // Fetch user location and server info in parallel
    Promise.all([
      fetch('/api/location').then(res => res.json()),
      fetch('/api/server-info').then(res => res.json()),
    ])
      .then(([locationData, serverData]) => {
        setLocation(locationData);
        setServerInfo(serverData);
      })
      .catch(() => {
        setLocation(null);
        setServerInfo(null);
      });
  }, []);

  const handleButtonClick = () => {
    if (isRunning) {
      stopTest();
    } else if (phase === 'complete') {
      resetTest();
      setTestedServer(null);
    } else {
      // Save the selected server at test start time
      setTestedServer(selectedServer);
      startTest();
    }
  };

  const getGaugeLabel = () => {
    switch (phase) {
      case 'ping':
        return t.phases.latency;
      case 'download':
        return t.phases.download;
      case 'upload':
        return t.phases.upload;
      case 'complete':
        return t.phases.complete;
      default:
        return t.phases.idle;
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

  // Get the server to display (selected or auto-detected)
  const displayServer = selectedServer || (serverInfo ? {
    code: serverInfo.server.region.code,
    city: serverInfo.server.region.city,
    country: serverInfo.server.region.country,
    flag: serverInfo.server.region.flag,
    region: 'auto' as const,
  } : null);

  // Get the tested server for results display
  const resultServer = testedServer || displayServer;

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

      {/* Top bar with Language Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <LanguageSwitcher currentLocale={lang} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            <span className="text-white">Open</span>
            <span className="text-cyan-400">Speed</span>
            <span className="sr-only"> - {t.header.subtitle}</span>
          </h1>
          <p className="text-zinc-500 text-sm tracking-wide">
            {t.header.subtitle}
          </p>
          
          {/* Location Info */}
          {location && (
            <motion.div 
              className="flex items-center justify-center gap-2 mt-4 text-zinc-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LocationIcon />
              <span>
                {location.city}{location.region ? `, ${location.region}` : ''}
              </span>
            </motion.div>
          )}
        </motion.header>

        {/* Server Selector */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">{t.server.label}</span>
            <ServerSelector
              selectedServer={selectedServer}
              onServerChange={setSelectedServer}
              locale={lang}
              translations={{
                auto: t.server.auto,
                selectServer: t.server.selectServer,
                changeServer: t.server.changeServer,
              }}
              disabled={isRunning}
            />
            {/* Show current server info */}
            {displayServer && !selectedServer && (
              <span className="text-zinc-500 text-xs">
                {displayServer.flag} {displayServer.city}
              </span>
            )}
          </div>
        </motion.div>

        {/* Main content area */}
        <motion.section
          aria-label={t.accessibility.speedTestAriaLabel}
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
                  translations={{
                    start: t.speedTest.start,
                    startHint: t.speedTest.startHint,
                    tapToStop: t.speedTest.tapToStop,
                    phases: t.phases,
                  }}
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
              <ProgressBar 
                phase={phase} 
                progress={progress}
                translations={{
                  ping: t.phases.ping,
                  download: t.phases.download,
                  upload: t.phases.upload,
                }}
              />
              {/* Show testing server during test */}
              {testedServer && (
                <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-xs">
                  <ServerIcon />
                  <span>{testedServer.flag} {testedServer.city}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Results section */}
          {phase === 'complete' && (
            <>
              <h2 className="sr-only">{t.results.title}</h2>
              
              {/* Run Again button */}
              <button
                onClick={handleButtonClick}
                className="group flex items-center justify-center gap-3 px-10 py-4 rounded-lg transition-colors duration-200 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-zinc-900 font-medium text-lg"
                aria-label={t.accessibility.runAgainAriaLabel}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t.speedTest.runAgain}</span>
              </button>

              {/* Results grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mt-12" 
                role="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ResultCard
                  label={t.results.download}
                  value={results.download}
                  unit="Mbps"
                  icon={<DownloadIcon />}
                  color="#06b6d4"
                  delay={0}
                />
                <ResultCard
                  label={t.results.upload}
                  value={results.upload}
                  unit="Mbps"
                  icon={<UploadIcon />}
                  color="#ec4899"
                  delay={0.05}
                />
                <ResultCard
                  label={t.results.ping}
                  value={results.ping}
                  unit="ms"
                  icon={<PingIcon />}
                  color="#fbbf24"
                  delay={0.1}
                />
                <ResultCard
                  label={t.results.jitter}
                  value={results.jitter}
                  unit="ms"
                  icon={<JitterIcon />}
                  color="#a855f7"
                  delay={0.15}
                />
              </motion.div>

              {/* Server info in results */}
              {resultServer && (
                <motion.div
                  className="flex items-center justify-center gap-2 mt-6 text-zinc-500 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ServerIcon />
                  <span>
                    {t.server.label}: {resultServer.flag} {resultServer.city}, {resultServer.country}
                  </span>
                </motion.div>
              )}
            </>
          )}

          {/* Stop button when running */}
          {isRunning && (
            <button
              onClick={stopTest}
              aria-label={t.accessibility.cancelAriaLabel}
              className="px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700"
            >
              {t.speedTest.cancel}
            </button>
          )}
        </motion.section>

        {/* Footer */}
        <footer className="absolute bottom-6 text-center text-zinc-600 text-xs">
          <p>{t.footer.text}</p>
        </footer>
      </div>
    </main>
  );
}
