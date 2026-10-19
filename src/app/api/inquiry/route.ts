import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getClientIp, getGeoLocation } from '@/lib/geo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, country, message, page } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    // Get IP and geo
    const ip = getClientIp(request);
    const geo = await getGeoLocation(ip);

    const result = db.prepare(
      'INSERT INTO customers (name, email, phone, company, country, message, page) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(name, email, phone || '', company || '', country || geo.country, message, page || '');

    // Also log the visit
    db.prepare(
      'INSERT INTO visits (ip, country, city, user_agent, page, referer) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
      ip,
      geo.country,
      geo.city,
      request.headers.get('user-agent') || '',
      page || '/',
      request.headers.get('referer') || ''
    );

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
