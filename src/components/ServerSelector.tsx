'use client';

import { useState, useRef, useEffect } from 'react';

export interface ServerOption {
  code: string;
  city: string;
  country: string;
  flag: string;
  region: 'north-america' | 'europe' | 'asia-pacific' | 'south-america' | 'middle-east';
}

export const availableServers: ServerOption[] = [
  // North America
  { code: 'iad1', city: 'Washington, D.C.', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'sfo1', city: 'San Francisco', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'lax1', city: 'Los Angeles', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'ord1', city: 'Chicago', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'dfw1', city: 'Dallas', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'sea1', city: 'Seattle', country: 'USA', flag: '🇺🇸', region: 'north-america' },
  { code: 'yyz1', city: 'Toronto', country: 'Canada', flag: '🇨🇦', region: 'north-america' },
  
  // Europe
  { code: 'cdg1', city: 'Paris', country: 'France', flag: '🇫🇷', region: 'europe' },
  { code: 'lhr1', city: 'London', country: 'UK', flag: '🇬🇧', region: 'europe' },
  { code: 'fra1', city: 'Frankfurt', country: 'Germany', flag: '🇩🇪', region: 'europe' },
  { code: 'ams1', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', region: 'europe' },
  { code: 'mad1', city: 'Madrid', country: 'Spain', flag: '🇪🇸', region: 'europe' },
  { code: 'mxp1', city: 'Milan', country: 'Italy', flag: '🇮🇹', region: 'europe' },
  { code: 'arn1', city: 'Stockholm', country: 'Sweden', flag: '🇸🇪', region: 'europe' },
  { code: 'dub1', city: 'Dublin', country: 'Ireland', flag: '🇮🇪', region: 'europe' },
  
  // Asia Pacific
  { code: 'hnd1', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', region: 'asia-pacific' },
  { code: 'icn1', city: 'Seoul', country: 'South Korea', flag: '🇰🇷', region: 'asia-pacific' },
  { code: 'sin1', city: 'Singapore', country: 'Singapore', flag: '🇸🇬', region: 'asia-pacific' },
  { code: 'syd1', city: 'Sydney', country: 'Australia', flag: '🇦🇺', region: 'asia-pacific' },
  { code: 'hkg1', city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰', region: 'asia-pacific' },
  { code: 'bom1', city: 'Mumbai', country: 'India', flag: '🇮🇳', region: 'asia-pacific' },
  
  // South America
  { code: 'gru1', city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', region: 'south-america' },
  { code: 'scl1', city: 'Santiago', country: 'Chile', flag: '🇨🇱', region: 'south-america' },
  
  // Middle East
  { code: 'dxb1', city: 'Dubai', country: 'UAE', flag: '🇦🇪', region: 'middle-east' },
];

const regionNames: Record<string, Record<string, string>> = {
  en: {
    'north-america': 'North America',
    'europe': 'Europe',
    'asia-pacific': 'Asia Pacific',
    'south-america': 'South America',
    'middle-east': 'Middle East',
  },
  fr: {
    'north-america': 'Amérique du Nord',
    'europe': 'Europe',
    'asia-pacific': 'Asie-Pacifique',
    'south-america': 'Amérique du Sud',
    'middle-east': 'Moyen-Orient',
  },
  es: {
    'north-america': 'Norteamérica',
    'europe': 'Europa',
    'asia-pacific': 'Asia Pacífico',
    'south-america': 'Sudamérica',
    'middle-east': 'Medio Oriente',
  },
  it: {
    'north-america': 'Nord America',
    'europe': 'Europa',
    'asia-pacific': 'Asia Pacifico',
    'south-america': 'Sud America',
    'middle-east': 'Medio Oriente',
  },
  de: {
    'north-america': 'Nordamerika',
    'europe': 'Europa',
    'asia-pacific': 'Asien-Pazifik',
    'south-america': 'Südamerika',
    'middle-east': 'Naher Osten',
  },
  ja: {
    'north-america': '北米',
    'europe': 'ヨーロッパ',
    'asia-pacific': 'アジア太平洋',
    'south-america': '南米',
    'middle-east': '中東',
  },
};

interface ServerSelectorProps {
  selectedServer: ServerOption | null;
  onServerChange: (server: ServerOption | null) => void;
  locale: string;
  translations: {
    auto: string;
    selectServer: string;
    changeServer: string;
  };
  disabled?: boolean;
}

export default function ServerSelector({
  selectedServer,
  onServerChange,
  locale,
  translations,
  disabled = false,
}: ServerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const regions = regionNames[locale] || regionNames.en;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const groupedServers = availableServers.reduce((acc, server) => {
    if (!acc[server.region]) {
      acc[server.region] = [];
    }
    acc[server.region].push(server);
    return acc;
  }, {} as Record<string, ServerOption[]>);

  const regionOrder = ['europe', 'north-america', 'asia-pacific', 'south-america', 'middle-east'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm ${
          disabled
            ? 'bg-zinc-800/30 border-zinc-800/30 text-zinc-600 cursor-not-allowed'
            : 'bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700/50 text-zinc-300'
        }`}
        aria-label={translations.selectServer}
        aria-expanded={isOpen}
      >
        {selectedServer ? (
          <>
            <span className="text-base">{selectedServer.flag}</span>
            <span className="hidden sm:inline">{selectedServer.city}</span>
            <span className="sm:hidden">{selectedServer.code.replace(/[0-9]/g, '').toUpperCase()}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{translations.auto}</span>
          </>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 max-h-96 overflow-y-auto rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl z-50">
          {/* Auto option */}
          <button
            onClick={() => {
              onServerChange(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-zinc-800 ${
              selectedServer === null
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <div className="font-medium">{translations.auto}</div>
              <div className="text-xs text-zinc-500">Nearest server</div>
            </div>
            {selectedServer === null && (
              <svg className="w-4 h-4 ml-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Grouped servers */}
          {regionOrder.map((regionKey) => {
            const servers = groupedServers[regionKey];
            if (!servers) return null;

            return (
              <div key={regionKey}>
                <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-800/50">
                  {regions[regionKey]}
                </div>
                {servers.map((server) => (
                  <button
                    key={server.code}
                    onClick={() => {
                      onServerChange(server);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      selectedServer?.code === server.code
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-lg">{server.flag}</span>
                    <div className="text-left flex-1">
                      <div>{server.city}</div>
                      <div className="text-xs text-zinc-500">{server.country}</div>
                    </div>
                    {selectedServer?.code === server.code && (
                      <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

