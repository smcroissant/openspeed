import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['en', 'fr', 'es', 'it', 'de', 'ja'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  ja: '日本語',
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

