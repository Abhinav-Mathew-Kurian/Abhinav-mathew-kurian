import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { Skills } from "@/components/home/skills";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Timeline } from "@/components/home/timeline";
import { ContactCta } from "@/components/home/contact-cta";
import { getFeaturedProjects, getSkillsByCategory, getExperience } from "@/lib/data";

export default async function Home() {
  const [projects, skills, experience] = await Promise.all([
    getFeaturedProjects(),
    getSkillsByCategory(),
    getExperience(),
  ]);

  return (
    <>
      <Hero />
      <AboutPreview />
      <Skills skills={skills} />
      <FeaturedProjects projects={projects} />
      <Timeline experience={experience} index={4} />
      <ContactCta />
    </>
  );
}
