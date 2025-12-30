import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Get the user's IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Use ip-api.com for geolocation (free, no API key required)
    const response = await fetch(`http://ip-api.com/json/${ip === '::1' || ip === '127.0.0.1' ? '' : ip}?fields=status,message,country,countryCode,region,regionName,city,isp,org,query`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }

    const data = await response.json();

    if (data.status === 'fail') {
      // Return default/fallback data for local development
      return Response.json({
        ip: ip,
        city: 'Local',
        region: 'Development',
        country: 'Server',
        countryCode: 'LC',
        isp: 'Local Network',
        org: '',
      });
    }

    return Response.json({
      ip: data.query,
      city: data.city,
      region: data.regionName,
      country: data.country,
      countryCode: data.countryCode,
      isp: data.isp,
      org: data.org,
    });
  } catch (error) {
    console.error('Location error:', error);
    return Response.json({
      ip: 'unknown',
      city: 'Unknown',
      region: '',
      country: 'Unknown',
      countryCode: 'XX',
      isp: '',
      org: '',
    });
  }
}

