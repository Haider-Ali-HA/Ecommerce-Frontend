import { z } from "zod";

// Common regex checks for password complexity
const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasNumber = /\d/;
const hasSpecial = /[^A-Za-z0-9]/; // any non-alphanumeric

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters")
  .refine((val) => hasLowercase.test(val), {
    message: "Password must include a lowercase letter",
  })
  .refine((val) => hasUppercase.test(val), {
    message: "Password must include an uppercase letter",
  })
  .refine((val) => hasNumber.test(val), {
    message: "Password must include a number",
  })
  .refine((val) => hasSpecial.test(val), {
    message: "Password must include a special character",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must be at most 100 characters"),
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must be at most 100 characters"),
  password: passwordSchema,
  phone: z
    .string()
    .trim()
    // 10 to 15 digits (international formats often fall here). Adjust if your needs differ.
    .regex(/^\d{10,15}$/, "Phone must be 10 to 15 digits"),
});

export default { loginSchema, registerSchema };
