import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { SkillModel } from "@/lib/models/Skill";
import { ExperienceModel } from "@/lib/models/Experience";
import { SettingsModel } from "@/lib/models/Settings";
import { toPlain } from "@/lib/serialize";
import {
  PLACEHOLDER_PROJECTS,
  PLACEHOLDER_SKILLS,
  PLACEHOLDER_EXPERIENCE,
  type PlaceholderProject,
} from "@/lib/placeholder-data";

/**
 * Data-access layer for the public site. Every function tries MongoDB
 * first and falls back to the placeholder content if the DB isn't
 * configured yet (no MONGODB_URI) or hasn't been seeded — so the site
 * always renders something reasonable, and swapping in real content is
 * just `npm run seed` away, no code changes needed.
 */

/** Static fallback so /resume always works, even before MongoDB is configured. */
export const DEFAULT_RESUME_URL =
  "/resume/Abhinav_Mathew_Kurian_FlowCV_Resume_2026-06-05.pdf";

export const PROJECT_CATEGORY_LABEL = {
  "full-time": "Full-time",
  personal: "Personal",
} as const;

export const PROJECT_STATUS_LABEL = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

export type ProjectDoc = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  techStack: string[];
  keySkills: string[];
  category: "full-time" | "personal";
  role?: string;
  period?: string;
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  gallery: string[];
  featured: boolean;
  order: number;
  status: "live" | "in-progress" | "archived";
};

export type ProjectCardData = Pick<
  ProjectDoc,
  "slug" | "title" | "summary" | "techStack" | "liveUrl" | "githubUrl" | "period" | "status"
>;

export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  current?: boolean;
  /** Short version, shown on the homepage timeline. */
  summary: string;
  /** Full bullet-point detail, shown on the About page's CV section. */
  description: string;
};

function placeholderToProjectDoc(p: PlaceholderProject, order: number): ProjectDoc {
  return {
    _id: p.slug,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    description: p.description,
    techStack: p.techStack,
    keySkills: p.keySkills ?? [],
    category: p.category ?? "personal",
    role: p.role,
    period: p.period,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    gallery: [],
    featured: p.featured ?? true,
    order,
    status: "live",
  };
}

export async function getAllProjects(): Promise<ProjectDoc[]> {
  try {
    await connectToDatabase();
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    if (docs.length === 0) throw new Error("No projects seeded yet");
    return toPlain<ProjectDoc[]>(docs);
  } catch {
    return PLACEHOLDER_PROJECTS.map(placeholderToProjectDoc);
  }
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectCardData[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  try {
    await connectToDatabase();
    const doc = await ProjectModel.findOne({ slug }).lean();
    if (doc) return toPlain<ProjectDoc>(doc);
  } catch {
    // fall through to placeholder lookup below
  }
  const index = PLACEHOLDER_PROJECTS.findIndex((p) => p.slug === slug);
  return index >= 0
    ? placeholderToProjectDoc(PLACEHOLDER_PROJECTS[index], index)
    : null;
}

export async function getSkillsByCategory(): Promise<Record<string, string[]>> {
  try {
    await connectToDatabase();
    const docs = await SkillModel.find()
      .sort({ category: 1, order: 1 })
      .lean();
    if (docs.length === 0) throw new Error("No skills seeded yet");

    const grouped: Record<string, string[]> = {};
    for (const doc of toPlain<{ name: string; category: string }[]>(docs)) {
      grouped[doc.category] ??= [];
      grouped[doc.category].push(doc.name);
    }
    return grouped;
  } catch {
    return PLACEHOLDER_SKILLS;
  }
}

function formatPeriod(startDate: string, endDate: string | null, current: boolean) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const start = fmt(startDate);
  if (current) return `${start} – Present`;
  return endDate ? `${start} – ${fmt(endDate)}` : start;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    await connectToDatabase();
    const docs = await ExperienceModel.find().sort({ order: 1 }).lean();
    if (docs.length === 0) throw new Error("No experience seeded yet");

    type RawExperience = {
      title: string;
      company: string;
      startDate: string;
      endDate: string | null;
      current: boolean;
      summary: string;
      description: string;
    };

    return toPlain<RawExperience[]>(docs).map((doc) => ({
      title: doc.title,
      org: doc.company,
      period: formatPeriod(doc.startDate, doc.endDate, doc.current),
      current: doc.current,
      summary: doc.summary,
      description: doc.description,
    }));
  } catch {
    return PLACEHOLDER_EXPERIENCE as ExperienceItem[];
  }
}

/** The current resume URL, editable from /admin/settings. Falls back to the static PDF. */
export async function getResumeUrl(): Promise<string> {
  try {
    await connectToDatabase();
    const doc = await SettingsModel.findOne().lean<{ resumeUrl?: string }>();
    return doc?.resumeUrl || DEFAULT_RESUME_URL;
  } catch {
    return DEFAULT_RESUME_URL;
  }
}
