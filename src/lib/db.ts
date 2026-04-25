import { Pool } from "pg";

let pool: Pool | null = null;
let schemaReady = false;

export const getPool = () => {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL ortam değişkeni tanımlı değil.");
  }
  const sslRequired =
    connectionString.includes("sslmode=require") ||
    connectionString.includes("ssl=true") ||
    process.env.PGSSLMODE === "require";
  pool = new Pool({ connectionString, ssl: sslRequired ? { rejectUnauthorized: false } : undefined });
  return pool;
};

export const ensureSchema = async () => {
  if (schemaReady) return;
  const db = getPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt_b64 TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash_b64 TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS kvkk_consents (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      version INTEGER NOT NULL,
      accepted_at TIMESTAMPTZ NOT NULL
    );
  `);

  schemaReady = true;
};
