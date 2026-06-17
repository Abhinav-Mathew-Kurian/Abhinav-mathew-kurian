import { z } from "zod";

export const SKILL_CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Real-Time Systems",
  "Security & Cryptography",
  "Databases",
  "Cloud & DevOps",
  "AI & Agents",
  "Blockchain",
] as const;

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(100),
  category: z.enum(SKILL_CATEGORIES),
  order: z.number().default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;
