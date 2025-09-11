import { NextResponse } from "next/server";

import { loginSchema } from "@/lib/schemas/auth";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, signToken, setSessionCookie } from "@/lib/auth";

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
    name: user.name,
  });
  setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
