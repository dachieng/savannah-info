"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/hooks/useSession";
import Loading from "@/components/ui/Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, loading } = useSessionStore();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading) return <Loading />;
  if (!session) return null;

  return <>{children}</>;
}
