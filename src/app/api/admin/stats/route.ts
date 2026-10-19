import { NextResponse } from 'next/server';
import { getStats } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';


export async function GET(request: Request) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getStats();

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
