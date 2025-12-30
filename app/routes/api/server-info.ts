import type { LoaderFunctionArgs } from "react-router";

// Vercel Edge Region codes to human-readable names (using country codes instead of emojis)
const VERCEL_REGIONS: Record<string, { city: string; country: string; flag: string }> = {
  // North America
  'iad1': { city: 'Washington, D.C.', country: 'USA', flag: 'US' },
  'iad': { city: 'Washington, D.C.', country: 'USA', flag: 'US' },
  'cle1': { city: 'Cleveland', country: 'USA', flag: 'US' },
  'cle': { city: 'Cleveland', country: 'USA', flag: 'US' },
  'sfo1': { city: 'San Francisco', country: 'USA', flag: 'US' },
  'sfo': { city: 'San Francisco', country: 'USA', flag: 'US' },
  'pdx1': { city: 'Portland', country: 'USA', flag: 'US' },
  'pdx': { city: 'Portland', country: 'USA', flag: 'US' },
  'bos1': { city: 'Boston', country: 'USA', flag: 'US' },
  'bos': { city: 'Boston', country: 'USA', flag: 'US' },
  'lax1': { city: 'Los Angeles', country: 'USA', flag: 'US' },
  'lax': { city: 'Los Angeles', country: 'USA', flag: 'US' },
  'sea1': { city: 'Seattle', country: 'USA', flag: 'US' },
  'sea': { city: 'Seattle', country: 'USA', flag: 'US' },
  'dfw1': { city: 'Dallas', country: 'USA', flag: 'US' },
  'dfw': { city: 'Dallas', country: 'USA', flag: 'US' },
  'atl1': { city: 'Atlanta', country: 'USA', flag: 'US' },
  'atl': { city: 'Atlanta', country: 'USA', flag: 'US' },
  'den1': { city: 'Denver', country: 'USA', flag: 'US' },
  'den': { city: 'Denver', country: 'USA', flag: 'US' },
  'ord1': { city: 'Chicago', country: 'USA', flag: 'US' },
  'ord': { city: 'Chicago', country: 'USA', flag: 'US' },
  'yyz1': { city: 'Toronto', country: 'Canada', flag: 'CA' },
  'yyz': { city: 'Toronto', country: 'Canada', flag: 'CA' },
  'yul1': { city: 'Montreal', country: 'Canada', flag: 'CA' },
  'yul': { city: 'Montreal', country: 'Canada', flag: 'CA' },
  
  // Europe
  'cdg1': { city: 'Paris', country: 'France', flag: 'FR' },
  'cdg': { city: 'Paris', country: 'France', flag: 'FR' },
  'lhr1': { city: 'London', country: 'UK', flag: 'GB' },
  'lhr': { city: 'London', country: 'UK', flag: 'GB' },
  'ams1': { city: 'Amsterdam', country: 'Netherlands', flag: 'NL' },
  'ams': { city: 'Amsterdam', country: 'Netherlands', flag: 'NL' },
  'fra1': { city: 'Frankfurt', country: 'Germany', flag: 'DE' },
  'fra': { city: 'Frankfurt', country: 'Germany', flag: 'DE' },
  'dub1': { city: 'Dublin', country: 'Ireland', flag: 'IE' },
  'dub': { city: 'Dublin', country: 'Ireland', flag: 'IE' },
  'arn1': { city: 'Stockholm', country: 'Sweden', flag: 'SE' },
  'arn': { city: 'Stockholm', country: 'Sweden', flag: 'SE' },
  'mad1': { city: 'Madrid', country: 'Spain', flag: 'ES' },
  'mad': { city: 'Madrid', country: 'Spain', flag: 'ES' },
  'mxp1': { city: 'Milan', country: 'Italy', flag: 'IT' },
  'mxp': { city: 'Milan', country: 'Italy', flag: 'IT' },
  'waw1': { city: 'Warsaw', country: 'Poland', flag: 'PL' },
  'waw': { city: 'Warsaw', country: 'Poland', flag: 'PL' },
  
  // Asia Pacific
  'hnd1': { city: 'Tokyo', country: 'Japan', flag: 'JP' },
  'hnd': { city: 'Tokyo', country: 'Japan', flag: 'JP' },
  'nrt1': { city: 'Tokyo', country: 'Japan', flag: 'JP' },
  'nrt': { city: 'Tokyo', country: 'Japan', flag: 'JP' },
  'icn1': { city: 'Seoul', country: 'South Korea', flag: 'KR' },
  'icn': { city: 'Seoul', country: 'South Korea', flag: 'KR' },
  'sin1': { city: 'Singapore', country: 'Singapore', flag: 'SG' },
  'sin': { city: 'Singapore', country: 'Singapore', flag: 'SG' },
  'syd1': { city: 'Sydney', country: 'Australia', flag: 'AU' },
  'syd': { city: 'Sydney', country: 'Australia', flag: 'AU' },
  'hkg1': { city: 'Hong Kong', country: 'Hong Kong', flag: 'HK' },
  'hkg': { city: 'Hong Kong', country: 'Hong Kong', flag: 'HK' },
  'bom1': { city: 'Mumbai', country: 'India', flag: 'IN' },
  'bom': { city: 'Mumbai', country: 'India', flag: 'IN' },
  'kix1': { city: 'Osaka', country: 'Japan', flag: 'JP' },
  'kix': { city: 'Osaka', country: 'Japan', flag: 'JP' },
  
  // South America
  'gru1': { city: 'Sao Paulo', country: 'Brazil', flag: 'BR' },
  'gru': { city: 'Sao Paulo', country: 'Brazil', flag: 'BR' },
  'scl1': { city: 'Santiago', country: 'Chile', flag: 'CL' },
  'scl': { city: 'Santiago', country: 'Chile', flag: 'CL' },
  'bog1': { city: 'Bogota', country: 'Colombia', flag: 'CO' },
  'bog': { city: 'Bogota', country: 'Colombia', flag: 'CO' },
  
  // Middle East & Africa
  'cpt1': { city: 'Cape Town', country: 'South Africa', flag: 'ZA' },
  'cpt': { city: 'Cape Town', country: 'South Africa', flag: 'ZA' },
  'jnb1': { city: 'Johannesburg', country: 'South Africa', flag: 'ZA' },
  'jnb': { city: 'Johannesburg', country: 'South Africa', flag: 'ZA' },
  'dxb1': { city: 'Dubai', country: 'UAE', flag: 'AE' },
  'dxb': { city: 'Dubai', country: 'UAE', flag: 'AE' },
  'bah1': { city: 'Bahrain', country: 'Bahrain', flag: 'BH' },
  'bah': { city: 'Bahrain', country: 'Bahrain', flag: 'BH' },
};

function parseVercelRegion(vercelId: string | null): string | null {
  if (!vercelId) return null;
  // x-vercel-id format: "iad1::iad1::xxxxx-xxxxx" or "iad1::xxxxx"
  const regionCode = vercelId.split('::')[0];
  return regionCode.replace(/[0-9]/g, ''); // Remove numbers like "iad1" -> "iad"
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Get Vercel-specific headers
  const vercelId = request.headers.get('x-vercel-id');
  
  // Parse the region from x-vercel-id
  const regionCode = parseVercelRegion(vercelId);
  const fullRegionCode = vercelId?.split('::')[0] || null;
  
  // Get region info
  const regionInfo = regionCode ? (VERCEL_REGIONS[regionCode] || VERCEL_REGIONS[fullRegionCode || '']) : null;
  
  // Determine if running locally or on Vercel
  const isVercel = !!vercelId || process.env.VERCEL === '1';
  const isProduction = process.env.VERCEL_ENV === 'production';
  
  return Response.json({
    server: {
      provider: isVercel ? 'Vercel Edge Network' : 'Local Development',
      region: regionInfo ? {
        code: fullRegionCode || regionCode,
        city: regionInfo.city,
        country: regionInfo.country,
        flag: regionInfo.flag,
      } : isVercel ? {
        code: fullRegionCode || 'unknown',
        city: 'Edge Server',
        country: 'Global',
        flag: 'WW',
      } : {
        code: 'local',
        city: 'Local',
        country: 'Development',
        flag: 'DEV',
      },
      environment: isProduction ? 'production' : isVercel ? 'preview' : 'development',
    },
    timestamp: Date.now(),
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
