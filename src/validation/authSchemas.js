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
    // Accept Pakistani mobile numbers in two allowed formats:
    // - Local format: 11 digits starting with '03' (e.g. 03123456789)
    // - With country code: 12 digits starting with '92' (e.g. 923123456789)
    .refine((val) => {
      // Only digits allowed
      if (!/^\d+$/.test(val)) return false;
      // Local (no country code): 11 digits, starts with 03
      if (/^03\d{9}$/.test(val)) return true;
      // With country code 92: 12 digits, starts with 92 then 3
      if (/^92?3\d{9}$/.test(val) && val.length === 12 && val.startsWith("92"))
        return true;
      return false;
    }, "Phone must be a valid Pakistani mobile number (e.g. 03123456789 or 923123456789)"),
});

// 6-digit verification token
export const verifyTokenSchema = z.object({
  verifyToken: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  resetPasswordToken: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Reset token must be 6 digits"),
  newPassword: passwordSchema,
});

export default {
  loginSchema,
  registerSchema,
  verifyTokenSchema,
  forgotPasswordSchema,
};
