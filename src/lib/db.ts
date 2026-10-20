/**
 * Unified data module with three backends, resolved lazily:
 * - Redis (@upstash/redis)  → production on Vercel, when UPSTASH_REDIS_REST_URL is set
 * - SQLite (better-sqlite3) → local development
 * - In-memory               → fallback when neither is usable (e.g. Vercel without Redis)
 *
 * The in-memory fallback exists so that serverless deployments never crash with a
 * read-only-filesystem error. Data is not persisted across cold starts in that mode.
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

type Backend = 'redis' | 'sqlite' | 'memory';

const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function nowStr(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

let backend: Backend | null = null;

// Accept the Upstash Marketplace integration, Vercel KV, and direct Redis variable names.
function hasRedisEnv(): boolean {
  return !!(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  );
}

function getBackend(): Backend {
  if (backend) return backend;
  if (hasRedisEnv()) {
    backend = 'redis';
  } else {
    try {
      getSqlite();
      backend = 'sqlite';
    } catch {
      // Read-only filesystem (serverless) or missing native module.
      backend = 'memory';
    }
  }
  return backend;
}

// ─── Redis Backend ────────────────────────────────────────────────
let redis: any = null;

async function getRedis() {
  if (!redis) {
    const { Redis } = await import('@upstash/redis');
    // fromEnv() resolves UPSTASH_REDIS_REST_URL/TOKEN and KV_REST_API_URL/TOKEN automatically.
    redis = Redis.fromEnv();
  }
  return redis;
}

// ─── SQLite Backend (local dev) ───────────────────────────────────
let sqlite: any = null;

function getSqlite() {
  if (sqlite) return sqlite;
  const Database = require('better-sqlite3');
  const path = require('path');
  const fs = require('fs');

  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  const db = new Database(path.join(dbDir, 'trade.db'));
  db.exec(`
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

  const row = db.prepare('SELECT COUNT(*) as c FROM admins').get();
  if ((row as any).c === 0) {
    db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(
      DEFAULT_USERNAME,
      bcrypt.hashSync(DEFAULT_PASSWORD, 10)
    );
  }

  sqlite = db;
  return sqlite;
}

// ─── In-memory Backend (fallback) ────────────────────────────────
const mem = {
  customers: [] as Customer[],
  visits: [] as Visit[],
  admins: new Map<string, AdminRecord>(),
  seqCustomer: 0,
  seqVisit: 0,
};

// ─── Shared stats builder ────────────────────────────────────────

function buildStats(visits: Visit[], totalVisits: number, totalCustomers: number, customersToday: number) {
  const today = new Date().toISOString().slice(0, 10);
  const todayVisits = visits.filter((v) => v.created_at && v.created_at.startsWith(today)).length;

  const countryMap = new Map<string, number>();
  for (const v of visits) {
    if (v.country) countryMap.set(v.country, (countryMap.get(v.country) || 0) + 1);
  }
  const visitsByCountry = Array.from(countryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }));

  const pageMap = new Map<string, number>();
  for (const v of visits) {
    if (v.page) pageMap.set(v.page, (pageMap.get(v.page) || 0) + 1);
  }
  const visitsByPage = Array.from(pageMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  const last7: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    last7[new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)] = 0;
  }
  for (const v of visits) {
    const day = (v.created_at || '').slice(0, 10);
    if (day in last7) last7[day]++;
  }
  const visitsLast7Days = Object.entries(last7).map(([date, count]) => ({ date, count }));

  const recentVisits = [...visits]
    .sort((a, b) => b.id - a.id)
    .slice(0, 20)
    .map(({ id, ip, country, city, page, created_at }) => ({ id, ip, country, city, page, created_at }));

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

// ─── Unified API: Customers ─────────────────────────────────────

export async function insertCustomer(data: Omit<Customer, 'id' | 'created_at'>): Promise<{ id: number }> {
  const b = getBackend();

  if (b === 'redis') {
    const r = await getRedis();
    const id = await r.incr('counter:customers');
    const record: Customer = { id, created_at: nowStr(), ...data };
    await r.hset(`customer:${id}`, record);
    await r.zadd('customers:index', { score: id, member: String(id) });
    return { id };
  }

  if (b === 'sqlite') {
    const db = getSqlite();
    const info = db.prepare(
      'INSERT INTO customers (name, email, phone, company, country, message, page, created_at) VALUES (?,?,?,?,?,?,?,?)'
    ).run(data.name, data.email, data.phone || '', data.company || '', data.country || '', data.message, data.page || '', nowStr());
    return { id: info.lastInsertRowid as number };
  }

  const record: Customer = { id: ++mem.seqCustomer, created_at: nowStr(), ...data };
  mem.customers.push(record);
  return { id: record.id };
}

export async function listCustomers(page = 1, pageSize = 20): Promise<{ customers: Customer[]; total: number }> {
  const b = getBackend();

  if (b === 'redis') {
    const r = await getRedis();
    const total = await r.zcard('customers:index');
    if (total === 0) return { customers: [], total: 0 };
    const start = total - page * pageSize;
    const end = total - (page - 1) * pageSize - 1;
    const ids = start < 0 ? await r.zrange('customers:index', 0, end) : await r.zrange('customers:index', start, end);
    const customers: Customer[] = [];
    for (const id of ids) {
      const record = await r.hgetall(`customer:${id}`);
      if (record) customers.push({ ...(record as any), id: Number((record as any).id) } as Customer);
    }
    return { customers, total };
  }

  if (b === 'sqlite') {
    const db = getSqlite();
    const offset = (page - 1) * pageSize;
    const customers = db.prepare('SELECT * FROM customers ORDER BY id DESC LIMIT ? OFFSET ?').all(pageSize, offset);
    const total = (db.prepare('SELECT COUNT(*) as c FROM customers').get() as any).c;
    return { customers, total };
  }

  const total = mem.customers.length;
  const customers = [...mem.customers]
    .sort((a, b2) => b2.id - a.id)
    .slice((page - 1) * pageSize, page * pageSize);
  return { customers, total };
}

// ─── Unified API: Visits ────────────────────────────────────────

export async function insertVisit(data: Omit<Visit, 'id' | 'created_at'>): Promise<void> {
  const b = getBackend();

  if (b === 'redis') {
    const r = await getRedis();
    const id = await r.incr('counter:visits');
    const record: Visit = { id, created_at: nowStr(), ...data };
    await r.hset(`visit:${id}`, record);
    await r.zadd('visits:index', { score: id, member: String(id) });
    const count = await r.zcard('visits:index');
    if (count > 10000) {
      const overflow = await r.zpopmin('visits:index', count - 10000);
      for (const item of overflow) {
        await r.del(`visit:${(item as any).member}`);
      }
    }
    return;
  }

  if (b === 'sqlite') {
    const db = getSqlite();
    db.prepare(
      'INSERT INTO visits (ip, country, city, user_agent, page, referer, created_at) VALUES (?,?,?,?,?,?,?)'
    ).run(data.ip, data.country, data.city, data.user_agent, data.page, data.referer, nowStr());
    return;
  }

  mem.visits.push({ id: ++mem.seqVisit, created_at: nowStr(), ...data });
  if (mem.visits.length > 10000) mem.visits.splice(0, mem.visits.length - 10000);
}

export async function getStats() {
  const b = getBackend();

  if (b === 'redis') {
    const r = await getRedis();
    const [allIds, totalCustomers] = await Promise.all([
      r.zrange('visits:index', 0, -1),
      r.zcard('customers:index'),
    ]);

    const visits: Visit[] = [];
    if (allIds.length) {
      const pipeline = r.pipeline();
      for (const id of allIds) pipeline.hgetall(`visit:${id}`);
      const results = await pipeline.exec();
      for (const rec of results) {
        if (rec) visits.push({ ...(rec as any), id: Number((rec as any).id) } as Visit);
      }
    }

    return buildStats(visits, allIds.length, totalCustomers, totalCustomers);
  }

  if (b === 'sqlite') {
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

  const today = new Date().toISOString().slice(0, 10);
  const customersToday = mem.customers.filter((c) => (c.created_at || '').startsWith(today)).length;
  return buildStats(mem.visits, mem.visits.length, mem.customers.length, customersToday);
}

// ─── Unified API: Admin auth ────────────────────────────────────

export async function getAdmin(username: string): Promise<AdminRecord | null> {
  const b = getBackend();

  if (b === 'redis') {
    const r = await getRedis();
    const record = await r.hgetall(`admin:${username}`);
    if (record && (record as any).username) {
      return { username: (record as any).username, password: (record as any).password };
    }
    // A fresh Redis has no admin record — seed the default one on first login.
    if (username !== DEFAULT_USERNAME) return null;
    const password = bcrypt.hashSync(DEFAULT_PASSWORD, 10);
    await r.hset(`admin:${username}`, { username, password });
    return { username, password };
  }

  if (b === 'sqlite') {
    const db = getSqlite();
    const row = db.prepare('SELECT username, password FROM admins WHERE username = ?').get(username) as AdminRecord | undefined;
    return row || null;
  }

  const existing = mem.admins.get(username);
  if (existing) return existing;
  if (username !== DEFAULT_USERNAME) return null;
  const seeded: AdminRecord = { username, password: bcrypt.hashSync(DEFAULT_PASSWORD, 10) };
  mem.admins.set(username, seeded);
  return seeded;
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  const admin = await getAdmin(username);
  if (!admin) return false;
  return bcrypt.compareSync(password, admin.password);
}

export default { insertCustomer, listCustomers, insertVisit, getStats, getAdmin, verifyAdmin };
