export const SESSION_COOKIE = "bc_admin_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET manquant ou trop court");
  }
  return secret;
}

function getPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD manquant");
  }
  return password;
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return Buffer.from(signature).toString("base64url");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({
    exp: Date.now() + SESSION_MAX_AGE_MS,
    v: 1,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = await hmacSign(encoded, getSecret());
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret || secret.length < 16) return false;

    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    const expected = await hmacSign(encoded, secret);
    if (!timingSafeEqualStr(signature, expected)) return false;

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    ) as { exp: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  try {
    const expected = getPassword();
    return timingSafeEqualStr(input, expected);
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_MS / 1000,
};
