import { z } from "zod";

export const PROJECT_TYPES = [
  "New website or web app",
  "Existing app — fixes/features",
  "Full-time opportunity",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Under ₹25,000",
  "₹25,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  projectType: z.string().optional().or(z.literal("")),
  budgetRange: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more about your project")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
