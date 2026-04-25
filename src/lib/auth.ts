import crypto from "crypto";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

const pbkdf2Async = (password: string, salt: Buffer, iterations: number, keylen: number, digest: string) =>
  new Promise<Buffer>((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

export const hashPassword = async (password: string, saltB64: string) => {
  const salt = Buffer.from(saltB64, "base64");
  const derived = await pbkdf2Async(password, salt, 120_000, 32, "sha256");
  return derived.toString("base64");
};

export const generateSaltB64 = () => crypto.randomBytes(16).toString("base64");

export const generateSessionToken = () => crypto.randomBytes(32).toString("base64url");

export const sha256B64 = (value: string) => crypto.createHash("sha256").update(value).digest("base64");

export const nowIso = () => new Date().toISOString();

