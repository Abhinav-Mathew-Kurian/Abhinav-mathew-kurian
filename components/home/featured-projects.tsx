import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectCardData } from "@/lib/data";

export function FeaturedProjects({ projects }: { projects: ProjectCardData[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        index={3}
        eyebrow="Work"
        title="Selected systems."
        description="Full case studies, stack, and links for each are on the projects page."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-10">
        <Button
          variant="outline"
          className="glow-border rounded-md"
          nativeButton={false}
          render={<Link href="/projects" />}
        >
          View all projects <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>
    </section>
  );
}
