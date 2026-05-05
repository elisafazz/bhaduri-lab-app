export type Role = "admin" | "member";

export const ROLE_COOKIE = "lab_role";

async function hmac(value: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function signRoleCookie(role: Role): Promise<string> {
  const secret = process.env.LAB_AUTH_SECRET;
  if (!secret) throw new Error("LAB_AUTH_SECRET not set");
  const sig = await hmac(role, secret);
  return `${role}.${sig}`;
}

export async function verifyRoleCookie(
  value: string | undefined
): Promise<Role | null> {
  if (!value) return null;
  const secret = process.env.LAB_AUTH_SECRET;
  if (!secret) return null;
  const dot = value.lastIndexOf(".");
  if (dot < 0) return null;
  const role = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (role !== "admin" && role !== "member") return null;
  const expected = await hmac(role, secret);
  if (sig !== expected) return null;
  return role;
}
