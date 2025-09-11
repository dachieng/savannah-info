"use client";

import { create } from "zustand";

import { ISession } from "@/lib/types/auth";

type State = {
  session: ISession | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  setSession: (s: ISession | null) => void;
  clearSession: () => void;
  fetchMe: () => Promise<void>;
};

export const useSessionStore = create<State & Actions>((set) => ({
  session: null,
  loading: true,
  error: null,

  setSession: (s) => set({ session: s, error: null }),
  clearSession: () => set({ session: null, error: null }),

  fetchMe: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) {
        set({ session: null, loading: false });
        return;
      }
      const data = await res.json();
      set({ session: data.user, loading: false });
    } catch (e) {
      console.error(e);
      set({ session: null, loading: false, error: "Failed to load session" });
    }
  },
}));
