/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from "@testing-library/react";
import { useSessionStore } from "@/hooks/useSession";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("useSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store state
    useSessionStore.setState({
      session: null,
      loading: true,
      error: null,
    });
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const { result } = renderHook(() => useSessionStore());

      expect(result.current.session).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
    });
  });

  describe("setSession", () => {
    it("should set session and clear error", () => {
      const { result } = renderHook(() => useSessionStore());
      const mockSession = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };

      act(() => {
        result.current.setSession(mockSession);
      });

      expect(result.current.session).toEqual(mockSession);
      expect(result.current.error).toBeNull();
    });

    it("should clear session when passed null", () => {
      const { result } = renderHook(() => useSessionStore());

      // First set a session
      act(() => {
        result.current.setSession({
          id: "1",
          email: "test@example.com",
          name: "Test User",
        });
      });

      // Then clear it
      act(() => {
        result.current.setSession(null);
      });

      expect(result.current.session).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe("clearSession", () => {
    it("should clear session and error", () => {
      const { result } = renderHook(() => useSessionStore());

      // Set initial state with session and error
      act(() => {
        useSessionStore.setState({
          session: { id: "1", email: "test@example.com", name: "Test User" },
          error: "Some error",
          loading: false,
        });
      });

      act(() => {
        result.current.clearSession();
      });

      expect(result.current.session).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe("fetchMe", () => {
    it("should fetch user session successfully", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ user: mockUser }),
      } as any);

      const { result } = renderHook(() => useSessionStore());

      await act(async () => {
        await result.current.fetchMe();
      });

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/me", {
        cache: "no-store",
      });
      expect(result.current.session).toEqual(mockUser);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should clear session when API returns not ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as any);

      const { result } = renderHook(() => useSessionStore());

      await act(async () => {
        await result.current.fetchMe();
      });

      expect(result.current.session).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle fetch errors", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useSessionStore());

      await act(async () => {
        await result.current.fetchMe();
      });

      expect(result.current.session).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Failed to load session");
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should set loading state during fetch", async () => {
      let resolvePromise: (value: any) => void;
      const fetchPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValueOnce(fetchPromise as any);

      const { result } = renderHook(() => useSessionStore());

      const fetchPromiseAct = act(async () => {
        await result.current.fetchMe();
      });

      // Should be loading
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();

      // Resolve the promise
      resolvePromise!({
        ok: true,
        json: () =>
          Promise.resolve({
            user: { id: "1", email: "test@example.com", name: "Test" },
          }),
      });

      await fetchPromiseAct;

      expect(result.current.loading).toBe(false);
    });
  });
});
