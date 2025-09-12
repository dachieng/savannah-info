import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/enums/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME.SESSION, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return res;
}
