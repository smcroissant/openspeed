import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, hasLocale, locales, type Locale } from './dictionaries';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openspeed.app';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  if (!hasLocale(lang)) {
    return {};
  }
  
  const dict = await getDictionary(lang as Locale);
  
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: '%s | OpenSpeed',
    },
    description: dict.meta.description,
    keywords: [
      'speed test',
      'internet speed test',
      'bandwidth test',
      'download speed',
      'upload speed',
      'ping test',
      'latency test',
      'jitter test',
      'network speed',
      'broadband test',
      'wifi speed test',
      'connection test',
      'internet test',
      'speed check',
      'mbps test',
    ],
    authors: [{ name: 'OpenSpeed' }],
    creator: 'OpenSpeed',
    publisher: 'OpenSpeed',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: `${siteUrl}/${lang}`,
      siteName: 'OpenSpeed',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'OpenSpeed - Internet Speed Test',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ['/og-image.png'],
      creator: '@openspeed',
    },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        es: `${siteUrl}/es`,
        it: `${siteUrl}/it`,
        de: `${siteUrl}/de`,
        ja: `${siteUrl}/ja`,
      },
    },
    category: 'technology',
    classification: 'Internet Tools',
  };
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  if (!hasLocale(lang)) {
    notFound();
  }
  
  const dict = await getDictionary(lang as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'OpenSpeed',
    description: dict.meta.description,
    url: `${siteUrl}/${lang}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: lang,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: dict.schema.featureList,
  };

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

