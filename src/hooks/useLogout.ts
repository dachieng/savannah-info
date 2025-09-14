"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/hooks/useSession";

export function useLogout() {
  const router = useRouter();
  const clearSession = useSessionStore((s) => s.clearSession);

  return async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        clearSession();
        router.replace("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear the session on the client side
      clearSession();
      router.replace("/login");
    }
  };
}
