/**
 * Unified database module with dual-backend support:
 * - Production (Vercel): Upstash Redis (set UPSTASH_REDIS_REST_URL env var)
 * - Development: Local better-sqlite3
 */

import bcrypt from 'bcryptjs';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
  page: string;
  created_at: string;
}

export interface Visit {
  id: number;
  ip: string;
  country: string;
  city: string;
  user_agent: string;
  page: string;
  referer: string;
  created_at: string;
}

export interface AdminRecord {
  username: string;
  password: string;
}

const useRedis = !!process.env.UPSTASH_REDIS_REST_URL;

// ─── Redis Backend (Vercel Production) ────────────────────────────
let redis: any = null;

async function getRedis() {
  if (!redis) {
    const { Redis } = await import('@upstash/redis');
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

// ─── SQLite Backend (Local Dev) ──────────────────────────────────
let sqlite: any = null;

function getSqlite() {
  if (sqlite) return sqlite;
  const Database = require('better-sqlite3');
  const path = require('path');
  const fs = require('fs');

  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  sqlite = new Database(path.join(dbDir, 'trade.db'));
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, company TEXT,
      country TEXT, message TEXT, page TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT, country TEXT, city TEXT, user_agent TEXT, page TEXT, referer TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS admins (
      username TEXT PRIMARY KEY, password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY, value TEXT
    );
  `);

  // Seed default admin
  const row = sqlite.prepare('SELECT COUNT(*) as c FROM admins').get();
  if ((row as any).c === 0) {
    const pw = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
    sqlite.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', pw);
  }
  return sqlite;
}

// ─── Unified API ─────────────────────────────────────────────────

// ---- Customers ----

export async function insertCustomer(data: Omit<Customer, 'id' | 'created_at'>): Promise<{ id: number }> {
  if (useRedis) {
    const r = await getRedis();
    const id = await r.incr('counter:customers');
    const record: Customer = { id, created_at: new Date().toISOString().replace('T', ' ').slice(0, 19), ...data };
    await r.hset(`customer:${id}`, record);
    await r.zadd('customers:index', { score: id, member: String(id) });
    return { id };
  } else {
    const db = getSqlite();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const info = db.prepare(
      'INSERT INTO customers (name, email, phone, company, country, message, page, created_at) VALUES (?,?,?,?,?,?,?,?)'
    ).run(data.name, data.email, data.phone || '', data.company || '', data.country || '', data.message, data.page || '', now);
    return { id: info.lastInsertRowid as number };
  }
}

export async function listCustomers(page = 1, pageSize = 20): Promise<{ customers: Customer[]; total: number }> {
  if (useRedis) {
    const r = await getRedis();
    const total = await r.zcard('customers:index');
    const start = total - page * pageSize;
    const end = total - (page - 1) * pageSize - 1;
    const ids = start < 0 ? await r.zrange('customers:index', 0, end) : await r.zrange('customers:index', start, end);
    const customers: Customer[] = [];
    for (const id of ids) {
      const record = await r.hgetall(`customer:${id}`);
      if (record) customers.push({ ...record, id: Number(record.id) } as Customer);
    }
    return { customers, total };
  } else {
    const db = getSqlite();
    const offset = (page - 1) * pageSize;
    const customers = db.prepare('SELECT * FROM customers ORDER BY id DESC LIMIT ? OFFSET ?').all(pageSize, offset);
    const total = (db.prepare('SELECT COUNT(*) as c FROM customers').get() as any).c;
    return { customers, total };
  }
}

// ---- Visits ----

export async function insertVisit(data: Omit<Visit, 'id' | 'created_at'>): Promise<void> {
  if (useRedis) {
    const r = await getRedis();
    const id = await r.incr('counter:visits');
    const record: Visit = { id, created_at: new Date().toISOString().replace('T', ' ').slice(0, 19), ...data };
    await r.hset(`visit:${id}`, record);
    await r.zadd('visits:index', { score: id, member: String(id) });
    // TTL for visit keys (keep 10000 most recent)
    const count = await r.zcard('visits:index');
    if (count > 10000) {
      const overflow = await r.zpopmin('visits:index', count - 10000);
      for (const item of overflow) {
        await r.del(`visit:${item.member}`);
      }
    }
  } else {
    const db = getSqlite();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    db.prepare(
      'INSERT INTO visits (ip, country, city, user_agent, page, referer, created_at) VALUES (?,?,?,?,?,?,?)'
    ).run(data.ip, data.country, data.city, data.user_agent, data.page, data.referer, now);
  }
}

export async function getStats() {
  if (useRedis) {
    const r = await getRedis();

    const [totalVisits, totalCustomers] = await Promise.all([
      r.zcard('visits:index'),
      r.zcard('customers:index'),
    ]);

    // Fetch all visits (paginated by zrange)
    const allIds = await r.zrange('visits:index', 0, -1);
    const visits: Visit[] = [];
    const pipeline = r.pipeline();
    for (const id of allIds) pipeline.hgetall(`visit:${id}`);
    const results = await pipeline.exec();
    for (const rec of results) {
      if (rec) visits.push({ ...rec, id: Number((rec as any).id) } as Visit);
    }

    const today = new Date().toISOString().slice(0, 10);
    const todayVisits = visits.filter((v) => v.created_at.startsWith(today)).length;

    // Visits by country
    const countryMap = new Map<string, number>();
    for (const v of visits) {
      if (v.country) countryMap.set(v.country, (countryMap.get(v.country) || 0) + 1);
    }
    const visitsByCountry = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    // Visits by page
    const pageMap = new Map<string, number>();
    for (const v of visits) {
      if (v.page) pageMap.set(v.page, (pageMap.get(v.page) || 0) + 1);
    }
    const visitsByPage = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    // Last 7 days
    const last7: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      last7[d] = 0;
    }
    for (const v of visits) {
      const day = v.created_at.slice(0, 10);
      if (day in last7) last7[day]++;
    }
    const visitsLast7Days = Object.entries(last7).map(([date, count]) => ({ date, count }));

    // Recent visits
    const recentIds = allIds.slice(-20).reverse();
    const recentVisits: Visit[] = [];
    const p2 = r.pipeline();
    for (const id of recentIds) p2.hgetall(`visit:${id}`);
    const r2 = await p2.exec();
    for (const rec of r2) {
      if (rec) recentVisits.push({ ...rec, id: Number((rec as any).id) } as Visit);
    }

    return {
      totalVisits,
      todayVisits,
      totalCustomers,
      customersToday: totalCustomers, // simplified — count all customers
      visitsByCountry,
      visitsByPage,
      visitsLast7Days,
      recentVisits,
    };
  } else {
    const db = getSqlite();
    const totalVisits = (db.prepare('SELECT COUNT(*) as c FROM visits').get() as any).c;
    const todayVisits = (db.prepare("SELECT COUNT(*) as c FROM visits WHERE DATE(created_at) = DATE('now')").get() as any).c;
    const totalCustomers = (db.prepare('SELECT COUNT(*) as c FROM customers').get() as any).c;
    const customersToday = (db.prepare("SELECT COUNT(*) as c FROM customers WHERE DATE(created_at) = DATE('now')").get() as any).c;

    const visitsByCountry = db.prepare(
      'SELECT country, COUNT(*) as count FROM visits WHERE country IS NOT NULL AND country != "" GROUP BY country ORDER BY count DESC LIMIT 10'
    ).all();
    const visitsByPage = db.prepare(
      'SELECT page, COUNT(*) as count FROM visits GROUP BY page ORDER BY count DESC LIMIT 10'
    ).all();
    const visitsLast7Days = db.prepare(`
      SELECT DATE(created_at) as date, COUNT(*) as count FROM visits
      WHERE created_at >= datetime('now', '-6 days')
      GROUP BY DATE(created_at) ORDER BY date ASC
    `).all();
    const recentVisits = db.prepare(
      'SELECT id, ip, country, city, page, created_at FROM visits ORDER BY id DESC LIMIT 20'
    ).all();

    return {
      totalVisits,
      todayVisits,
      totalCustomers,
      customersToday,
      visitsByCountry,
      visitsByPage,
      visitsLast7Days,
      recentVisits,
    };
  }
}

// ---- Admin Auth ----

export async function getAdmin(username: string): Promise<AdminRecord | null> {
  if (useRedis) {
    const r = await getRedis();
    const record = await r.hgetall(`admin:${username}`);
    if (!record || !(record as any).username) return null;
    return { username: (record as any).username, password: (record as any).password };
  } else {
    const db = getSqlite();
    const row = db.prepare('SELECT username, password FROM admins WHERE username = ?').get(username) as AdminRecord | undefined;
    return row || null;
  }
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  const admin = await getAdmin(username);
  if (!admin) return false;
  return bcrypt.compareSync(password, admin.password);
}

// Export for backward compat
export default { insertCustomer, listCustomers, insertVisit, getStats, getAdmin, verifyAdmin };
