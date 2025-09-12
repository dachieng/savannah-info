"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/hooks/useSession";

export function useLogout() {
  const router = useRouter();
  const clearSession = useSessionStore((s) => s.clearSession);

  return async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      clearSession();
      router.replace("/login");
      router.refresh();
    }
  };
}
