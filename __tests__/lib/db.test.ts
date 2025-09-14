/* eslint-disable @typescript-eslint/no-explicit-any */
import { findUserByEmail, createUser } from "@/lib/db";
import { promises as fs } from "fs";

// Mock fs module
jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const mockFs = fs as jest.Mocked<typeof fs>;

// Mock data
const mockUsers = [
  {
    id: "1",
    email: "test@example.com",
    name: "Test User",
    passwordHash: "hashedpassword123",
  },
  {
    id: "2",
    email: "user2@example.com",
    name: "User Two",
    passwordHash: "hashedpassword456",
  },
];

describe("Database Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findUserByEmail", () => {
    it("should find an existing user by email", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));

      const user = await findUserByEmail("test@example.com");

      expect(user).toBeDefined();
      expect(user?.email).toBe("test@example.com");
      expect(user?.name).toBe("Test User");
    });

    it("should find user by email case-insensitively", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));

      const user = await findUserByEmail("TEST@EXAMPLE.COM");

      expect(user).toBeDefined();
      expect(user?.email).toBe("test@example.com");
    });

    it("should return null for non-existing user", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));

      const user = await findUserByEmail("nonexistent@example.com");

      expect(user).toBeNull();
    });

    it("should return empty array when file does not exist", async () => {
      const error = new Error("File not found") as any;
      error.code = "ENOENT";
      mockFs.readFile.mockRejectedValueOnce(error);

      const user = await findUserByEmail("test@example.com");

      expect(user).toBeNull();
    });

    it("should throw error for other file system errors", async () => {
      const error = new Error("Permission denied");
      mockFs.readFile.mockRejectedValueOnce(error);

      await expect(findUserByEmail("test@example.com")).rejects.toThrow(
        "Permission denied"
      );
    });

    it("should handle invalid JSON gracefully", async () => {
      mockFs.readFile.mockResolvedValueOnce("invalid json");

      await expect(findUserByEmail("test@example.com")).rejects.toThrow();
    });
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));
      mockFs.writeFile.mockResolvedValueOnce(undefined);

      const newUser = await createUser(
        "newuser@example.com",
        "New User",
        "hashedpassword789"
      );

      expect(newUser).toBeDefined();
      expect(newUser.email).toBe("newuser@example.com");
      expect(newUser.name).toBe("New User");
      expect(newUser.passwordHash).toBe("hashedpassword789");
      expect(newUser.id).toBeDefined();
      expect(mockFs.writeFile).toHaveBeenCalledTimes(1);
    });

    it("should create user with null name", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));
      mockFs.writeFile.mockResolvedValueOnce(undefined);

      const newUser = await createUser(
        "newuser@example.com",
        null,
        "hashedpassword789"
      );

      expect(newUser.name).toBeNull();
    });

    it("should convert email to lowercase", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));
      mockFs.writeFile.mockResolvedValueOnce(undefined);

      const newUser = await createUser(
        "NEWUSER@EXAMPLE.COM",
        "New User",
        "hashedpassword789"
      );

      expect(newUser.email).toBe("newuser@example.com");
    });

    it("should throw error when email already exists", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));

      await expect(
        createUser("test@example.com", "Another User", "hashedpassword789")
      ).rejects.toThrow("Email already in use");
    });

    it("should throw error when email already exists (case insensitive)", async () => {
      mockFs.readFile.mockResolvedValueOnce(JSON.stringify(mockUsers));

      await expect(
        createUser("TEST@EXAMPLE.COM", "Another User", "hashedpassword789")
      ).rejects.toThrow("Email already in use");
    });

    it("should create user when starting with empty database", async () => {
      const error = new Error("File not found") as any;
      error.code = "ENOENT";
      mockFs.readFile.mockRejectedValueOnce(error);
      mockFs.writeFile.mockResolvedValueOnce(undefined);

      const newUser = await createUser(
        "firstuser@example.com",
        "First User",
        "hashedpassword123"
      );

      expect(newUser).toBeDefined();
      expect(newUser.email).toBe("firstuser@example.com");
    });
  });
});
