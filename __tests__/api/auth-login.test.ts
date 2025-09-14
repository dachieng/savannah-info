/**
 * @jest-environment node
 */

import { POST } from "@/app/api/auth/login/route";
import { NextRequest } from "next/server";
import * as db from "@/lib/db";
import * as auth from "@/lib/auth";

// Mock the dependencies
jest.mock("@/lib/db");
jest.mock("@/lib/auth");

const mockDb = db as jest.Mocked<typeof db>;
const mockAuth = auth as jest.Mocked<typeof auth>;

// Mock schema validation
jest.mock("@/lib/schemas/auth", () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
}));

const { loginSchema } = require("@/lib/schemas/auth"); // eslint-disable-line @typescript-eslint/no-require-imports

describe("/api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login user successfully", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashedpassword123",
    };

    // Mock successful validation
    loginSchema.safeParse.mockReturnValue({
      success: true,
      data: { email: "test@example.com", password: "password123" },
    });

    // Mock finding user
    mockDb.findUserByEmail.mockResolvedValue(mockUser);

    // Mock password verification
    mockAuth.verifyPassword.mockResolvedValue(true);

    // Mock token signing
    mockAuth.signToken.mockResolvedValue("mock-jwt-token");

    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.user).toEqual({
      id: "1",
      email: "test@example.com",
      name: "Test User",
    });
  });

  it("should return 400 for invalid payload", async () => {
    loginSchema.safeParse.mockReturnValue({
      success: false,
      error: { issues: [{ message: "Invalid email" }] },
    });

    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "invalid-email",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid payload");
  });

  it("should return 401 for non-existent user", async () => {
    loginSchema.safeParse.mockReturnValue({
      success: true,
      data: { email: "nonexistent@example.com", password: "password123" },
    });

    mockDb.findUserByEmail.mockResolvedValue(null);

    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "nonexistent@example.com",
        password: "password123",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid email or password");
  });

  it("should return 401 for incorrect password", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashedpassword123",
    };

    loginSchema.safeParse.mockReturnValue({
      success: true,
      data: { email: "test@example.com", password: "wrongpassword" },
    });

    mockDb.findUserByEmail.mockResolvedValue(mockUser);
    mockAuth.verifyPassword.mockResolvedValue(false);

    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid email or password");
  });
});
