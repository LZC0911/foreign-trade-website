export interface GeoResult {
  country: string;
  city: string;
}

export async function getGeoLocation(ip: string): Promise<GeoResult> {
  // Skip geo for localhost/private IPs
  if (!ip || ip.startsWith('127.') || ip.startsWith('10.') || ip.startsWith('192.168.') || ip === '::1' || ip === 'localhost') {
    return { country: 'Local', city: 'Local' };
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    
    if (!response.ok) {
      throw new Error('Geo API request failed');
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        city: data.city || 'Unknown',
      };
    }
    
    return { country: 'Unknown', city: 'Unknown' };
  } catch {
    return { country: 'Unknown', city: 'Unknown' };
  }
}

export function getClientIp(request: Request): string {
  const headers = request.headers;
  
  // Check various headers for real IP
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs - take the first one
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp;
  
  const forwardedFor = headers.get('forwarded');
  if (forwardedFor) {
    const match = forwardedFor.match(/for="?([^";]+)"?/);
    if (match) return match[1].trim();
  }
  
  return '127.0.0.1';
}
