import { SignUpSchema } from "@/lib/schemas/auth";

const registerUser = async (data: SignUpSchema) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Login failed");
  }

  return response.json();
};

const loginUser = async (data: SignUpSchema) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Important: include credentials for cookies
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Login failed");
  }

  const result = await response.json();
  return { data: result.user, ok: result.ok };
};

export { registerUser, loginUser };
