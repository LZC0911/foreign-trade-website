import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db';

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

export function authenticate(username: string, password: string): { success: boolean; token?: string; error?: string } {
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as { id: number; username: string; password: string } | undefined;
  
  if (!admin) {
    return { success: false, error: 'Invalid credentials' };
  }

  if (!bcrypt.compareSync(password, admin.password)) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = generateToken({ id: admin.id, username: admin.username });
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
