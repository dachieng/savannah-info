import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),

  name: z.string().min(1).max(60).optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(72, { message: "Password must not exceed 72 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#^()_\-+=]/, {
      message: "Password must contain at least one special character",
    }),
});

export type SignUpSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(72, { message: "Password must not exceed 72 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
