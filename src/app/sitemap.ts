import { MetadataRoute } from 'next';

const locales = ['en', 'fr', 'es', 'it', 'de', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openspeed.app';

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
  }));
}
