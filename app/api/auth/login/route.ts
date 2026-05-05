import { NextRequest, NextResponse } from "next/server";
import { ROLE_COOKIE, signRoleCookie, type Role } from "@/lib/auth";

export async function POST(req: NextRequest) {
  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = body.password;
  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  const adminPw = process.env.LAB_ADMIN_PASSWORD;
  const memberPw = process.env.LAB_MEMBER_PASSWORD;

  let role: Role | null = null;
  if (adminPw && password === adminPw) role = "admin";
  else if (memberPw && password === memberPw) role = "member";

  if (!role) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieValue = await signRoleCookie(role);
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(ROLE_COOKIE, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
