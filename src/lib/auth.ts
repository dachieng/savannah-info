import "server-only";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { JWTPayload } from "./types/auth";
import { COOKIE_NAME } from "./enums/auth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret");
const DEFAULT_EXP = process.env.JWT_EXPIRES_IN || "7d";

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export const signToken = async (payload: JWTPayload, exp = DEFAULT_EXP) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .setIssuedAt()
    .setSubject(payload.sub)
    .sign(secret);
};

export const verifyToken = async <T = JWTPayload>(token: string): Promise<T> =>
  (await jwtVerify(token, secret)).payload as T;

export const setSessionCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME.SESSION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

export const clearSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME.SESSION, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};

export const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME.SESSION)?.value;
    if (!token) return null;
    const verified = await verifyToken(token);
    return verified;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};
