import "server-only";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type User = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

// naive file read/write (fine for dev)
async function loadAll(): Promise<User[]> {
  try {
    const buf = await fs.readFile(DATA_FILE, "utf8");
    const arr = JSON.parse(buf);
    return Array.isArray(arr) ? (arr as User[]) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === "ENOENT") return []; // first run
    throw e;
  }
}

async function saveAll(users: User[]) {
  // single-writer; not safe for heavy concurrency (ok for demo/dev)
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string) {
  const users = await loadAll();
  const e = email.toLowerCase();
  return users.find((u) => u.email === e) ?? null;
}

export async function createUser(
  email: string,
  name: string | null,
  passwordHash: string
) {
  const users = await loadAll();
  const e = email.toLowerCase();
  if (users.some((u) => u.email === e)) {
    throw new Error("Email already in use");
  }
  const user: User = {
    id: randomUUID(),
    email: e,
    name: name ?? null,
    passwordHash,
  };
  users.push(user);
  await saveAll(users);
  return user;
}
