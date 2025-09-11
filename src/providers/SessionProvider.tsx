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

  // Redirect if already logged in and visiting login/signup
  useEffect(() => {
    if (!loading && session && PUBLIC_AUTH_PAGES.has(pathname)) {
      router.replace("/movies");
    }
  }, [loading, session, pathname, router]);

  // Optional UX: show nothing while we don't know the session yet (first paint)
  // You can render a skeleton here if you prefer.
  if (loading) return <Loading />;

  return <Fragment>{children}</Fragment>;
}
