import jwt from 'jsonwebtoken';
import { verifyAdmin } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-xyz123';

export function generateToken(payload: { id: number; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: number; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
  } catch {
    return null;
  }
}

export async function authenticate(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const isValid = await verifyAdmin(username, password);
  if (!isValid) {
    return { success: false, error: 'Invalid credentials' };
  }
  const token = generateToken({ id: 1, username });
  return { success: true, token };
}

export function getAuthFromRequest(request: Request): { id: number; username: string } | null {
  const authHeader = request.headers.get('authorization');
  const cookieHeader = request.headers.get('cookie');

  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (cookieHeader) {
    const match = cookieHeader.match(/token=([^;]+)/);
    if (match) token = decodeURIComponent(match[1]);
  }

  if (!token) return null;
  return verifyToken(token);
}
