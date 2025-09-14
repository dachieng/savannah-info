"use client";

import { Fragment, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useSessionStore } from "@/hooks/useSession";
import Loading from "@/components/ui/Loader";

const PUBLIC_AUTH_PAGES = new Set(["/login", "/signup"]);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { session, loading, fetchMe } = useSessionStore();

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle authentication redirects
  useEffect(() => {
    if (!loading) {
      if (session) {
        // If user is logged in and tries to access auth pages, redirect to movies
        if (PUBLIC_AUTH_PAGES.has(pathname)) {
          router.replace("/movies");
        }
      } else {
        // If user is not logged in and tries to access protected routes, redirect to login
        if (pathname.startsWith("/movies")) {
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        }
      }
    }
  }, [loading, session, pathname, router]);

  // Show loading state while checking authentication
  if (loading) return <Loading />;

  return <Fragment>{children}</Fragment>;
}
