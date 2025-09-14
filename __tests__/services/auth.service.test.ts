/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerUser, loginUser } from "@/services/auth.service";

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    const mockSignUpData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    it("should register user successfully", async () => {
      const mockResponse = {
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        ok: true,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      } as any);

      const result = await registerUser(mockSignUpData);

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mockSignUpData),
      });
      expect(result).toEqual({ data: mockResponse.user, ok: true });
    });

    it("should throw error when registration fails", async () => {
      const errorResponse = { error: "Email already exists" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(errorResponse),
      } as any);

      await expect(registerUser(mockSignUpData)).rejects.toThrow(
        "Email already exists"
      );
    });

    it("should throw generic error when response parsing fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
      } as any);

      await expect(registerUser(mockSignUpData)).rejects.toThrow(
        "Login failed"
      );
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(registerUser(mockSignUpData)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("loginUser", () => {
    const mockLoginData = {
      email: "test@example.com",
      password: "password123",
    };

    it("should login user successfully", async () => {
      const mockResponse = {
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        ok: true,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      } as any);

      const result = await loginUser(mockLoginData as any);

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mockLoginData),
      });
      expect(result).toEqual({ data: mockResponse.user, ok: true });
    });

    it("should throw error when login fails", async () => {
      const errorResponse = { error: "Invalid credentials" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(errorResponse),
      } as any);

      await expect(loginUser(mockLoginData as any)).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw generic error when response parsing fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
      } as any);

      await expect(loginUser(mockLoginData as any)).rejects.toThrow(
        "Login failed"
      );
    });
  });
});
