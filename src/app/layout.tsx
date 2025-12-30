import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openspeed.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OpenSpeed - Free Internet Speed Test | Check Your Connection',
    template: '%s | OpenSpeed',
  },
  description:
    'Test your internet connection speed instantly with OpenSpeed. Measure download speed, upload speed, ping, and jitter with our fast, accurate, and free speed test tool.',
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
    locale: 'en_US',
    url: siteUrl,
    siteName: 'OpenSpeed',
    title: 'OpenSpeed - Free Internet Speed Test',
    description:
      'Test your internet speed instantly. Measure download, upload, ping, and jitter with our free speed test.',
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
    title: 'OpenSpeed - Free Internet Speed Test',
    description:
      'Test your internet speed instantly. Measure download, upload, ping, and jitter.',
    images: ['/og-image.png'],
    creator: '@openspeed',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  classification: 'Internet Tools',
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'OpenSpeed',
    description:
      'Test your internet connection speed instantly with OpenSpeed. Measure download speed, upload speed, ping, and jitter.',
    url: siteUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Download speed test',
      'Upload speed test',
      'Ping/latency measurement',
      'Jitter measurement',
      'Real-time results',
    ],
  };

  return (
    <html lang="en">
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
