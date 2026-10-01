import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// ---------------------------------------------------------------------------
// Single data boundary: every section receives its content from here.
// Content is edited at /admin (Keystatic) and stored as YAML in ./content/.
// ---------------------------------------------------------------------------

const reader = createReader(process.cwd(), keystaticConfig);

// ----- Shapes consumed by the UI components -----

export interface Highlight {
  title: string;
  description: string;
  icon: "lightbulb" | "target" | "zap";
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  resumePath: string;
  shortBio: string;
  longBio: string;
  personalMission: string;
  elevatorPitch: string;
  valueProposition: string;
  roles: string[];
  metaTitle: string;
  metaDescription: string;
  highlights: Highlight[];
}

export interface Project {
  title: string;
  tagline: string;
  category: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  technologies: string[];
  challenges: string[];
  results: string;
  github?: string;
  demo?: string;
  patent?: string;
  patentDate?: string;
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Achievement {
  title: string;
  subtitle: string;
  date: string;
  type: string;
  detail?: string;
  description: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
}

export interface ExpertiseArea {
  category: string;
  items: string[];
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  url?: string;
}

export interface SiteContent {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: ExperienceItem[];
  skillCategories: [string, Skill[]][];
  achievements: Achievement[];
  journey: JourneyItem[];
  expertise: ExpertiseArea[];
  blogPosts: BlogPost[];
}

// Fixed section navigation (not content-editable — sections live in code).
export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Expertise", href: "#expertise" },
  { label: "Achievements", href: "#achievements" },
  { label: "Journey", href: "#journey" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
] as const;

// ----- Readers -----

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const info = await reader.singletons.personalInfo.read();
  if (!info) {
    throw new Error(
      "Personal info content is missing. Create it in the admin UI at /admin."
    );
  }
  return {
    ...info,
    roles: [...info.roles],
    highlights: info.highlights.map((h) => ({ ...h })),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [
    personalInfo,
    projectsRaw,
    experienceRaw,
    skillsRaw,
    achievementsRaw,
    journeyRaw,
    expertiseRaw,
    blogRaw,
  ] = await Promise.all([
    getPersonalInfo(),
    reader.collections.projects.all(),
    reader.collections.experience.all(),
    reader.collections.skills.all(),
    reader.collections.achievements.all(),
    reader.collections.journey.all(),
    reader.collections.expertise.all(),
    reader.collections.blog.all(),
  ]);

  const projects: Project[] = projectsRaw
    .map(({ slug, entry: p }) => ({ slug, p }))
    .sort(
      (a, b) =>
        (a.p.order ?? 0) - (b.p.order ?? 0) || a.slug.localeCompare(b.slug)
    )
    .map(({ p }) => ({
      title: p.title,
      tagline: p.tagline,
      category: p.category,
      problem: p.problem,
      solution: p.solution,
      architecture: [...p.architecture],
      features: [...p.features],
      technologies: [...p.technologies],
      challenges: [...p.challenges],
      results: p.results,
      github: p.github || undefined,
      demo: p.demo || undefined,
      patent: p.patent || undefined,
      patentDate: p.patentDate || undefined,
      featured: p.featured,
    }));

  const experience: ExperienceItem[] = experienceRaw
    .map(({ slug, entry: e }) => ({ slug, e }))
    .sort((a, b) => (a.e.order ?? 0) - (b.e.order ?? 0) || a.slug.localeCompare(b.slug))
    .map(({ e }) => ({
      role: e.role,
      organization: e.organization,
      duration: e.duration,
      description: [...e.description],
      technologies: [...e.technologies],
    }));

  const skillsRawSorted = skillsRaw
    .map(({ entry: s }) => s)
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        (a.order ?? 0) - (b.order ?? 0) ||
        a.name.localeCompare(b.name)
    );

  const grouped = new Map<string, Skill[]>();
  for (const s of skillsRawSorted) {
    const list = grouped.get(s.category) ?? [];
    list.push({ name: s.name, icon: s.icon });
    grouped.set(s.category, list);
  }
  const skillCategories: [string, Skill[]][] = [...grouped.entries()];

  const achievements: Achievement[] = achievementsRaw
    .map(({ slug, entry: a }) => ({ slug, a }))
    .sort((a, b) => (a.a.order ?? 0) - (b.a.order ?? 0) || a.slug.localeCompare(b.slug))
    .map(({ a }) => ({
      title: a.title,
      subtitle: a.subtitle,
      date: a.date,
      type: a.type,
      detail: a.detail || undefined,
      description: a.description,
    }));

  const journey: JourneyItem[] = journeyRaw
    .map(({ slug, entry: j }) => ({ slug, j }))
    .sort(
      (a, b) =>
        (a.j.order ?? 0) - (b.j.order ?? 0) ||
        a.j.year.localeCompare(b.j.year) ||
        a.slug.localeCompare(b.slug)
    )
    .map(({ j }) => ({
      year: j.year,
      title: j.title,
      subtitle: j.subtitle,
      description: j.description,
      type: j.type,
    }));

  const expertise: ExpertiseArea[] = expertiseRaw
    .map(({ slug, entry: e }) => ({ slug, e }))
    .sort((a, b) => (a.e.order ?? 0) - (b.e.order ?? 0) || a.slug.localeCompare(b.slug))
    .map(({ e }) => ({
      category: e.category,
      items: [...e.items],
    }));

  const blogPosts: BlogPost[] = blogRaw
    .map(({ entry: b }) => b)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((b) => ({
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      category: b.category,
      readTime: b.readTime,
      url: b.url || undefined,
    }));

  return {
    personalInfo,
    projects,
    experience,
    skillCategories,
    achievements,
    journey,
    expertise,
    blogPosts,
  };
}
