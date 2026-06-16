import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { PROJECT_STATUS_LABEL, type ProjectCardData } from "@/lib/data";

/** Shared "spec sheet" project card used on the homepage and the /projects listing. */
export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <div className="glass glow-border group flex h-full flex-col rounded-md border p-6">
      <div className="label-mono flex items-center justify-between text-muted-foreground">
        <span>{project.period ?? PROJECT_STATUS_LABEL[project.status]}</span>
        <ArrowUpRight className="size-4 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>

      <h3 className="mt-4 font-mono text-lg font-semibold text-foreground">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted-foreground">
        {project.summary}
      </p>

      <p className="label-mono mt-5 text-muted-foreground">
        {project.techStack.join(" · ")}
      </p>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            <ArrowUpRight className="size-3.5" /> Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="size-3.5" /> Code
          </a>
        )}
      </div>
    </div>
  );
}
