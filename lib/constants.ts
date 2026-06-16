/**
 * Single source of truth for contact details, social links, and site
 * metadata. Update here if any of these ever change.
 */
export const SITE = {
  name: "Abhinav Mathew Kurian",
  role: "Full-Stack & AI Systems Architect",
  url: "https://abhinavmathewkurian.com",
  location: "Trivandrum, Kerala, India",
  description:
    "Full-stack & AI systems architect — ZK proofs, graph databases, vector search, and real-time PKI-secured telemetry. Full-time at Kottackal Business Solutions, available for select freelance work.",
} as const;

export const CONTACT = {
  phone: "+918590535279",
  phoneDisplay: "+91 85905 35279",
  email: "abhinavmathewkurian@gmail.com",
  whatsapp: "https://wa.me/918590535279",
} as const;

export const SOCIAL = {
  github: "https://github.com/Abhinav-Mathew-Kurian",
  linkedin: "https://linkedin.com/in/abhinav-mathew-kurian-553042245",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Shareable resume link — redirects to whatever's set in /admin/settings. */
export const RESUME_LINK = { label: "Resume", href: "/resume" } as const;

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
