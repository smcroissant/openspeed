import { redirect, type LoaderFunctionArgs } from "react-router";

const locales = ['en', 'fr', 'es', 'it', 'de', 'ja'];
const defaultLocale = 'en';

function getLocale(request: Request): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, priority] = lang.trim().split(';q=');
        return {
          code: code.split('-')[0].toLowerCase(),
          priority: priority ? parseFloat(priority) : 1,
        };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const lang of languages) {
      if (locales.includes(lang.code)) {
        return lang.code;
      }
    }
  }

  return defaultLocale;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocale(request);
  return redirect(`/${locale}`);
}

export default function Redirect() {
  return null;
}

