import { NextResponse } from 'next/server';
import { insertVisit } from '@/lib/db';
import { getClientIp, getGeoLocation } from '@/lib/geo';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, referer } = body;

    const ip = getClientIp(request);
    const geo = await getGeoLocation(ip);

    await insertVisit({
      ip, country: geo.country, city: geo.city,
      user_agent: request.headers.get('user-agent') || '',
      page: page || '/', referer: referer || '',
    });

    return NextResponse.json({ success: true, country: geo.country, city: geo.city });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '/';

    const ip = getClientIp(request);
    const geo = await getGeoLocation(ip);

    await insertVisit({
      ip, country: geo.country, city: geo.city,
      user_agent: request.headers.get('user-agent') || '',
      page, referer: request.headers.get('referer') || '',
    });

    return NextResponse.json({ success: true, country: geo.country, city: geo.city });
  } catch (error) {
    console.error('Track GET error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
