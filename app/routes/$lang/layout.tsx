import { Outlet, redirect, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { hasLocale, getDictionary, type Locale } from "~/lib/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as string;
  
  if (!hasLocale(lang)) {
    throw redirect('/en');
  }
  
  const dict = getDictionary(lang as Locale);
  const siteUrl = process.env.SITE_URL || 'https://openspeed.app';
  
  return { lang, dict, siteUrl };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  
  const { lang, dict, siteUrl } = data;
  
  return [
    { title: dict.meta.title },
    { name: "description", content: dict.meta.description },
    { name: "keywords", content: "speed test, internet speed test, bandwidth test, download speed, upload speed, ping test, latency test, jitter test, network speed, broadband test, wifi speed test, connection test, internet test, speed check, mbps test" },
    { name: "author", content: "OpenSpeed" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: lang },
    { property: "og:url", content: `${siteUrl}/${lang}` },
    { property: "og:site_name", content: "OpenSpeed" },
    { property: "og:title", content: dict.meta.ogTitle },
    { property: "og:description", content: dict.meta.ogDescription },
    { property: "og:image", content: "/og-image.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: dict.meta.ogTitle },
    { name: "twitter:description", content: dict.meta.ogDescription },
    { name: "twitter:image", content: "/og-image.png" },
  ];
};

export function handle() {
  return { i18n: true };
}

export default function LangLayout() {
  const { lang, dict, siteUrl } = useLoaderData<typeof loader>();

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Outlet context={{ lang, dict }} />
    </>
  );
}
