import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

type Locale = 'en' | 'fr' | 'es' | 'it' | 'de' | 'ja';

const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Francais',
  es: 'Espanol',
  it: 'Italiano',
  de: 'Deutsch',
  ja: 'Japanese',
};

// Using country codes instead of emoji flags for better compatibility
const localeFlags: Record<Locale, string> = {
  en: 'GB',
  fr: 'FR',
  es: 'ES',
  it: 'IT',
  de: 'DE',
  ja: 'JP',
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const segments = location.pathname.split('/');
    segments[1] = newLocale;
    navigate(segments.join('/'));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 transition-colors text-sm text-zinc-300"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-medium text-zinc-400 bg-zinc-700/50 px-1.5 py-0.5 rounded">{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
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
        <div className="absolute right-0 mt-2 py-1 w-40 rounded-lg bg-zinc-800 border border-zinc-700 shadow-xl z-50">
          {(Object.keys(localeNames) as Locale[]).map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                locale === currentLocale
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <span className="text-xs font-medium text-zinc-400 bg-zinc-700/50 px-1.5 py-0.5 rounded">{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
