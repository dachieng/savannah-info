import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/schemas/auth";
import { createUser, findUserByEmail } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/enums/auth";

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = signupSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, password, name = null } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(email, name, passwordHash);

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user?.name || "",
  });

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
