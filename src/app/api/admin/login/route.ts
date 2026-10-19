import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password required' }, { status: 400 });
    }

    const result = authenticate(username, password);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', result.token!, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
