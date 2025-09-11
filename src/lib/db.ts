import "server-only";
import { randomUUID } from "crypto";
import { IUser } from "./types/auth";

const users = new Map<string, IUser>(); // key: email

export async function findUserByEmail(email: string) {
  return users.get(email.toLowerCase()) ?? null;
}

export const createUser = async (
  email: string,
  name: string | null,
  passwordHash: string
) => {
  const id = randomUUID();
  const user = {
    id,
    email: email.toLowerCase(),
    name: name ?? "",
    passwordHash,
  };
  users.set(user.email, user);
  return user;
};
