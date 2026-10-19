import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Total visits
    const totalVisits = (db.prepare('SELECT COUNT(*) as count FROM visits').get() as { count: number }).count;

    // Today's visits
    const todayVisits = (db.prepare(
      "SELECT COUNT(*) as count FROM visits WHERE DATE(created_at) = DATE('now')"
    ).get() as { count: number }).count;

    // Visits by country (top 10)
    const visitsByCountry = db.prepare(`
      SELECT country, COUNT(*) as count 
      FROM visits 
      WHERE country IS NOT NULL AND country != ''
      GROUP BY country 
      ORDER BY count DESC 
      LIMIT 10
    `).all();

    // Visits by page (top 10)
    const visitsByPage = db.prepare(`
      SELECT page, COUNT(*) as count 
      FROM visits 
      GROUP BY page 
      ORDER BY count DESC 
      LIMIT 10
    `).all();

    // Visits from last 7 days
    const visitsLast7Days = db.prepare(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM visits 
      WHERE created_at >= datetime('now', '-6 days')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `).all();

    // Customer stats
    const totalCustomers = (db.prepare('SELECT COUNT(*) as count FROM customers').get() as { count: number }).count;
    const customersToday = (db.prepare(
      "SELECT COUNT(*) as count FROM customers WHERE DATE(created_at) = DATE('now')"
    ).get() as { count: number }).count;

    // Recent visits
    const recentVisits = db.prepare(`
      SELECT id, ip, country, city, page, created_at 
      FROM visits 
      ORDER BY created_at DESC 
      LIMIT 20
    `).all();

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        todayVisits,
        totalCustomers,
        customersToday,
        visitsByCountry,
        visitsByPage,
        visitsLast7Days,
        recentVisits,
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
