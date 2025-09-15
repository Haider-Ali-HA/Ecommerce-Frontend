import { z } from "zod";

// Reuse password and phone rules similar to authSchemas
const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasNumber = /\d/;
const hasSpecial = /[^A-Za-z0-9]/;

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

const phoneSchema = z
  .string()
  .trim()
  .refine((val) => {
    if (!/^\d+$/.test(val)) return false;
    if (/^03\d{9}$/.test(val)) return true; // local: 03123456789
    if (/^92?3\d{9}$/.test(val) && val.length === 12 && val.startsWith("92"))
      return true; // with country code: 923123456789
    return false;
  }, "Phone must be a valid Pakistani mobile number (e.g. 03123456789 or 923123456789)");

export const createManagerSchema = z.object({
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
  phone: phoneSchema,
  isVerified: z.boolean().optional(),
});

// On update we may or may not change password; make it optional
export const updateManagerSchema = z.object({
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

  phone: phoneSchema,
  isVerified: z.boolean().optional(),
});

export default { createManagerSchema, updateManagerSchema };
