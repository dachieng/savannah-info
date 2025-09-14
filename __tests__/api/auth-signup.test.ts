/**
 * @jest-environment node
 */

import { POST } from "@/app/api/auth/signup/route";
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
  signupSchema: {
    safeParse: jest.fn(),
  },
}));

const { signupSchema } = require("@/lib/schemas/auth"); // eslint-disable-line @typescript-eslint/no-require-imports

describe("/api/auth/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register user successfully", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashedpassword123",
    };

    // Mock successful validation
    signupSchema.safeParse.mockReturnValue({
      success: true,
      data: {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      },
    });

    // Mock no existing user
    mockDb.findUserByEmail.mockResolvedValue(null);

    // Mock password hashing
    mockAuth.hashPassword.mockResolvedValue("hashedpassword123");

    // Mock user creation
    mockDb.createUser.mockResolvedValue(mockUser);

    // Mock token signing
    mockAuth.signToken.mockResolvedValue("mock-jwt-token");

    const req = new NextRequest("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
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
    signupSchema.safeParse.mockReturnValue({
      success: false,
      error: { issues: [{ message: "Invalid email" }] },
    });

    const req = new NextRequest("http://localhost:3000/api/auth/signup", {
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

  it("should return 409 for existing email", async () => {
    const existingUser = {
      id: "1",
      email: "existing@example.com",
      name: "Existing User",
      passwordHash: "hashedpassword123",
    };

    signupSchema.safeParse.mockReturnValue({
      success: true,
      data: {
        email: "existing@example.com",
        password: "password123",
        name: "New User",
      },
    });

    mockDb.findUserByEmail.mockResolvedValue(existingUser);

    const req = new NextRequest("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "existing@example.com",
        password: "password123",
        name: "New User",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe("Email already in use");
  });

  it("should register user without name", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: null,
      passwordHash: "hashedpassword123",
    };

    signupSchema.safeParse.mockReturnValue({
      success: true,
      data: {
        email: "test@example.com",
        password: "password123",
      },
    });

    mockDb.findUserByEmail.mockResolvedValue(null);
    mockAuth.hashPassword.mockResolvedValue("hashedpassword123");
    mockDb.createUser.mockResolvedValue(mockUser);
    mockAuth.signToken.mockResolvedValue("mock-jwt-token");

    const req = new NextRequest("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.name).toBeNull();
  });
});
