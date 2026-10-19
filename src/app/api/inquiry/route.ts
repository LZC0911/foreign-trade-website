import { NextResponse } from 'next/server';
import { insertCustomer, insertVisit } from '@/lib/db';
import { getClientIp, getGeoLocation } from '@/lib/geo';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, country, message, page } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const ip = getClientIp(request);
    const geo = await getGeoLocation(ip);

    const result = await insertCustomer({
      name, email, phone: phone || '', company: company || '',
      country: country || geo.country, message, page: page || '',
    });

    await insertVisit({
      ip, country: geo.country, city: geo.city,
      user_agent: request.headers.get('user-agent') || '',
      page: page || '/', referer: request.headers.get('referer') || '',
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
