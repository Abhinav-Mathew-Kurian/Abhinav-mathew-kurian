import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons/brand-icons";
import { ProjectDescription } from "@/components/projects/project-description";
import {
  getAllProjects,
  getProjectBySlug,
  PROJECT_CATEGORY_LABEL,
  PROJECT_STATUS_LABEL,
} from "@/lib/data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <p className="label-mono mt-6 text-muted-foreground">
        {[
          project.period,
          PROJECT_CATEGORY_LABEL[project.category],
          PROJECT_STATUS_LABEL[project.status],
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>

      <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 text-lg leading-[1.7] text-muted-foreground">{project.summary}</p>

      {project.coverImage && (
        <div className="glass mt-8 overflow-hidden rounded-md border">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={1280}
            height={720}
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        {project.liveUrl && (
          <Button
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
          >
            <ArrowUpRight className="size-4" /> View live
          </Button>
        )}
        {project.githubUrl && (
          <Button
            variant="outline"
            className="glow-border rounded-md"
            nativeButton={false}
            render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
          >
            <GithubIcon className="size-4" /> View code
          </Button>
        )}
      </div>

      <div className="mt-10">
        <ProjectDescription text={project.description} />
      </div>

      {project.keySkills.length > 0 && (
        <div className="mt-10 border-t border-border pt-6">
          <h2 className="label-mono text-muted-foreground">Key skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.keySkills.map((skill) => (
              <Badge key={skill} variant="outline" className="font-mono text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 border-t border-border pt-6">
        <h2 className="label-mono text-muted-foreground">Tech stack</h2>
        <p className="mt-3 text-sm text-foreground">
          {project.techStack.join(" · ")}
        </p>
      </div>

      {project.gallery.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((src) => (
            <div key={src} className="glass overflow-hidden rounded-md border">
              <Image
                src={src}
                alt={`${project.title} screenshot`}
                width={800}
                height={500}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
