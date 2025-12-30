import { NextRequest, NextResponse } from 'next/server';

// Vercel Edge Region codes to human-readable names
const VERCEL_REGIONS: Record<string, { city: string; country: string; flag: string }> = {
  // North America
  'iad1': { city: 'Washington, D.C.', country: 'USA', flag: '🇺🇸' },
  'iad': { city: 'Washington, D.C.', country: 'USA', flag: '🇺🇸' },
  'cle1': { city: 'Cleveland', country: 'USA', flag: '🇺🇸' },
  'cle': { city: 'Cleveland', country: 'USA', flag: '🇺🇸' },
  'sfo1': { city: 'San Francisco', country: 'USA', flag: '🇺🇸' },
  'sfo': { city: 'San Francisco', country: 'USA', flag: '🇺🇸' },
  'pdx1': { city: 'Portland', country: 'USA', flag: '🇺🇸' },
  'pdx': { city: 'Portland', country: 'USA', flag: '🇺🇸' },
  'bos1': { city: 'Boston', country: 'USA', flag: '🇺🇸' },
  'bos': { city: 'Boston', country: 'USA', flag: '🇺🇸' },
  'lax1': { city: 'Los Angeles', country: 'USA', flag: '🇺🇸' },
  'lax': { city: 'Los Angeles', country: 'USA', flag: '🇺🇸' },
  'sea1': { city: 'Seattle', country: 'USA', flag: '🇺🇸' },
  'sea': { city: 'Seattle', country: 'USA', flag: '🇺🇸' },
  'dfw1': { city: 'Dallas', country: 'USA', flag: '🇺🇸' },
  'dfw': { city: 'Dallas', country: 'USA', flag: '🇺🇸' },
  'atl1': { city: 'Atlanta', country: 'USA', flag: '🇺🇸' },
  'atl': { city: 'Atlanta', country: 'USA', flag: '🇺🇸' },
  'den1': { city: 'Denver', country: 'USA', flag: '🇺🇸' },
  'den': { city: 'Denver', country: 'USA', flag: '🇺🇸' },
  'ord1': { city: 'Chicago', country: 'USA', flag: '🇺🇸' },
  'ord': { city: 'Chicago', country: 'USA', flag: '🇺🇸' },
  'yyz1': { city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  'yyz': { city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  'yul1': { city: 'Montreal', country: 'Canada', flag: '🇨🇦' },
  'yul': { city: 'Montreal', country: 'Canada', flag: '🇨🇦' },
  
  // Europe
  'cdg1': { city: 'Paris', country: 'France', flag: '🇫🇷' },
  'cdg': { city: 'Paris', country: 'France', flag: '🇫🇷' },
  'lhr1': { city: 'London', country: 'UK', flag: '🇬🇧' },
  'lhr': { city: 'London', country: 'UK', flag: '🇬🇧' },
  'ams1': { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  'ams': { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  'fra1': { city: 'Frankfurt', country: 'Germany', flag: '🇩🇪' },
  'fra': { city: 'Frankfurt', country: 'Germany', flag: '🇩🇪' },
  'dub1': { city: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  'dub': { city: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  'arn1': { city: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  'arn': { city: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  'mad1': { city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  'mad': { city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  'mxp1': { city: 'Milan', country: 'Italy', flag: '🇮🇹' },
  'mxp': { city: 'Milan', country: 'Italy', flag: '🇮🇹' },
  'waw1': { city: 'Warsaw', country: 'Poland', flag: '🇵🇱' },
  'waw': { city: 'Warsaw', country: 'Poland', flag: '🇵🇱' },
  
  // Asia Pacific
  'hnd1': { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  'hnd': { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  'nrt1': { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  'nrt': { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  'icn1': { city: 'Seoul', country: 'South Korea', flag: '🇰🇷' },
  'icn': { city: 'Seoul', country: 'South Korea', flag: '🇰🇷' },
  'sin1': { city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  'sin': { city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  'syd1': { city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  'syd': { city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  'hkg1': { city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰' },
  'hkg': { city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰' },
  'bom1': { city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  'bom': { city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  'kix1': { city: 'Osaka', country: 'Japan', flag: '🇯🇵' },
  'kix': { city: 'Osaka', country: 'Japan', flag: '🇯🇵' },
  
  // South America
  'gru1': { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷' },
  'gru': { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷' },
  'scl1': { city: 'Santiago', country: 'Chile', flag: '🇨🇱' },
  'scl': { city: 'Santiago', country: 'Chile', flag: '🇨🇱' },
  'bog1': { city: 'Bogotá', country: 'Colombia', flag: '🇨🇴' },
  'bog': { city: 'Bogotá', country: 'Colombia', flag: '🇨🇴' },
  
  // Middle East & Africa
  'cpt1': { city: 'Cape Town', country: 'South Africa', flag: '🇿🇦' },
  'cpt': { city: 'Cape Town', country: 'South Africa', flag: '🇿🇦' },
  'jnb1': { city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦' },
  'jnb': { city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦' },
  'dxb1': { city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  'dxb': { city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  'bah1': { city: 'Bahrain', country: 'Bahrain', flag: '🇧🇭' },
  'bah': { city: 'Bahrain', country: 'Bahrain', flag: '🇧🇭' },
};

function parseVercelRegion(vercelId: string | null): string | null {
  if (!vercelId) return null;
  // x-vercel-id format: "iad1::iad1::xxxxx-xxxxx" or "iad1::xxxxx"
  const regionCode = vercelId.split('::')[0];
  return regionCode.replace(/[0-9]/g, ''); // Remove numbers like "iad1" -> "iad"
}

export async function GET(request: NextRequest) {
  // Get Vercel-specific headers
  const vercelId = request.headers.get('x-vercel-id');
  const vercelRegion = request.headers.get('x-vercel-deployment-url');
  
  // Parse the region from x-vercel-id
  const regionCode = parseVercelRegion(vercelId);
  const fullRegionCode = vercelId?.split('::')[0] || null;
  
  // Get region info
  const regionInfo = regionCode ? (VERCEL_REGIONS[regionCode] || VERCEL_REGIONS[fullRegionCode || '']) : null;
  
  // Determine if running locally or on Vercel
  const isVercel = !!vercelId || process.env.VERCEL === '1';
  const isProduction = process.env.VERCEL_ENV === 'production';
  
  return NextResponse.json({
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
        flag: '🌐',
      } : {
        code: 'local',
        city: 'Local',
        country: 'Development',
        flag: '💻',
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

