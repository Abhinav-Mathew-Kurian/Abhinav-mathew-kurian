import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  summary: z.string().trim().min(10).max(300),
  description: z.string().trim().min(10).max(5000),
  techStack: z.array(z.string().trim().min(1)).default([]),
  keySkills: z.array(z.string().trim().min(1)).default([]),
  category: z.enum(["full-time", "personal"]),
  role: z.string().trim().optional().or(z.literal("")),
  period: z.string().trim().optional().or(z.literal("")),
  liveUrl: z.string().trim().url().optional().or(z.literal("")),
  githubUrl: z.string().trim().url().optional().or(z.literal("")),
  coverImage: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().url()).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  status: z.enum(["live", "in-progress", "archived"]),
});

export type ProjectInput = z.infer<typeof projectSchema>;
