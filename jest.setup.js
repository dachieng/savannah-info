import "@testing-library/jest-dom";

// Mock environment variables
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";

// Add TextEncoder/TextDecoder for node environment
const { TextEncoder, TextDecoder } = require("text-encoding"); // eslint-disable-line @typescript-eslint/no-require-imports
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Next.js cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock jose library
jest.mock("jose", () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setSubject: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mock-jwt-token"),
  })),
  jwtVerify: jest.fn().mockResolvedValue({
    payload: {
      sub: "mock-user-id",
      email: "mock@example.com",
      name: "Mock User",
    },
  }),
}));

// Mock bcryptjs
jest.mock("bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("mock-salt"),
  hash: jest.fn().mockResolvedValue("mock-hash"),
  compare: jest.fn().mockResolvedValue(true),
}));

// Mock crypto randomUUID
const mockCrypto = {
  randomUUID: jest.fn(() => "mock-uuid-123"),
};
Object.defineProperty(global, "crypto", {
  value: mockCrypto,
});

// Mock Next.js environment variables
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
