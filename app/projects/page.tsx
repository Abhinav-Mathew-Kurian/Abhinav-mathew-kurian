import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";
import { getAllProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-time and personal projects spanning blockchain, graph databases, real-time telemetry, and AI-integrated platforms.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        index={1}
        eyebrow="Work"
        title="Every system, cataloged."
        description="Production and personal projects: case studies, stack, and links for each."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
