import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { getSiteContent } from "@/lib/content";

// Lazy-load below-fold sections for faster initial load
const Skills = dynamic(
  () => import("@/components/sections/Skills"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const Experience = dynamic(
  () => import("@/components/sections/Experience"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const Projects = dynamic(
  () => import("@/components/sections/Projects"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const TechnicalExpertise = dynamic(
  () => import("@/components/sections/TechnicalExpertise"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const Achievements = dynamic(
  () => import("@/components/sections/Achievements"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const EngineeringJourney = dynamic(
  () => import("@/components/sections/EngineeringJourney"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const GitHubSection = dynamic(
  () => import("@/components/sections/GitHubSection"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const BlogSection = dynamic(
  () => import("@/components/sections/BlogSection"),
  { loading: () => <div className="min-h-[200px]" /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact"),
  { loading: () => <div className="min-h-[200px]" /> }
);

export default async function Home() {
  const content = await getSiteContent();
  const { personalInfo } = content;

  return (
    <>
      <Hero info={personalInfo} />
      <About info={personalInfo} />
      <Skills categories={content.skillCategories} />
      <Experience experience={content.experience} />
      <Projects projects={content.projects} />
      <TechnicalExpertise expertise={content.expertise} />
      <Achievements achievements={content.achievements} />
      <EngineeringJourney journey={content.journey} />
      <GitHubSection githubUrl={personalInfo.github} />
      {/* <BlogSection posts={content.blogPosts} />? */}
      <Contact contact={personalInfo} />
    </>
  );
}
