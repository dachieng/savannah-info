import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/schemas/auth";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/enums/auth";

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name || "",
  });

  // IMPORTANT: set cookie on the response you return
  const res = NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name },
  });

  res.cookies.set(COOKIE_NAME.SESSION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
