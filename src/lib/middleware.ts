import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { PUBLIC_PATHS } from "@/helpers";
import { COOKIE_NAME } from "./enums/auth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret");

const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
};

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME.SESSION)?.value;
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: [
    /*
      Protect everything except:
      - static files, _next, images
      - explicit public paths above
    */
    "/((?!_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};
