import { config, collection, singleton, fields } from "@keystatic/core";

// When KEYSTATIC_GITHUB_REPO is set (e.g. "NikhShu/Portfolio"), the admin UI
// commits content changes straight to GitHub — which triggers a Vercel redeploy.
// Without it, storage falls back to "local": entries are written to ./content/
// on disk (perfect for local development).
const githubRepo = process.env.KEYSTATIC_GITHUB_REPO;

const storage =
  githubRepo && githubRepo.includes("/")
    ? { kind: "github" as const, repo: githubRepo as `${string}/${string}` }
    : { kind: "local" as const };

const stringList = (label: string) =>
  fields.array(fields.text({ label: "Item" }), {
    label,
    itemLabel: (props) => {
      const v = props.value;
      return typeof v === "string" && v.length > 0 ? v : "Item";
    },
  });

export default config({
  storage,
  ui: {
    brand: { name: "Portfolio Admin" },
  },
  singletons: {
    personalInfo: singleton({
      label: "Personal Info",
      path: "content/personal-info",
      schema: {
        name: fields.text({ label: "Full Name" }),
        title: fields.text({ label: "Professional Title" }),
        tagline: fields.text({ label: "Tagline", multiline: true }),
        email: fields.text({ label: "Email" }),
        location: fields.text({ label: "Location" }),
        linkedin: fields.text({ label: "LinkedIn URL" }),
        github: fields.text({ label: "GitHub URL" }),
        resumePath: fields.text({
          label: "Resume Path",
          description: "Public URL of the resume file, e.g. /resume.pdf",
        }),
        shortBio: fields.text({ label: "Short Bio", multiline: true }),
        longBio: fields.text({
          label: "Long Bio",
          multiline: true,
          description: "Separate paragraphs with a blank line",
        }),
        personalMission: fields.text({ label: "Personal Mission", multiline: true }),
        elevatorPitch: fields.text({ label: "Elevator Pitch", multiline: true }),
        valueProposition: fields.text({ label: "Value Proposition", multiline: true }),
        roles: stringList("Hero Roles (rotating)"),
        metaTitle: fields.text({ label: "SEO Title" }),
        metaDescription: fields.text({ label: "SEO Description", multiline: true }),
        highlights: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: fields.select({
              label: "Highlight Icon",
              options: [
                { label: "Lightbulb", value: "lightbulb" },
                { label: "Target", value: "target" },
                { label: "Zap", value: "zap" },
              ],
              defaultValue: "lightbulb",
            }),
          }),
          {
            label: "About Highlights",
            itemLabel: (props) => {
              const t = props.fields.title.value;
              return typeof t === "string" && t.length > 0 ? t : "Highlight";
            },
          }
        ),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        tagline: fields.text({ label: "Tagline" }),
        category: fields.text({ label: "Category" }),
        problem: fields.text({ label: "Problem", multiline: true }),
        solution: fields.text({ label: "Solution", multiline: true }),
        architecture: stringList("Architecture Points"),
        features: stringList("Key Features"),
        technologies: stringList("Technologies"),
        challenges: stringList("Challenges Solved"),
        results: fields.text({ label: "Results & Impact", multiline: true }),
        github: fields.text({ label: "GitHub URL" }),
        demo: fields.text({ label: "Live Demo URL" }),
        patent: fields.text({ label: "Patent Number" }),
        patentDate: fields.text({ label: "Patent Date" }),
        featured: fields.checkbox({ label: "Featured Project", defaultValue: false }),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    experience: collection({
      label: "Work Experience",
      slugField: "role",
      path: "content/experience/*",
      format: { data: "yaml" },
      schema: {
        role: fields.slug({ name: { label: "Role" } }),
        organization: fields.text({ label: "Organization" }),
        duration: fields.text({ label: "Duration", description: "e.g. May 2025 - July 2025" }),
        description: stringList("Responsibilities / Achievements"),
        technologies: stringList("Technologies"),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    skills: collection({
      label: "Skills",
      slugField: "name",
      path: "content/skills/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Skill Name" } }),
        category: fields.text({
          label: "Category",
          description: "Skills are grouped by this category on the site",
        }),
        icon: fields.text({
          label: "Icon Key",
          description:
            "One of: python, java, c, terminal, javascript, typescript, react, nextjs, html5, tailwind, nodejs, api, microservices, fastapi, mysql, mongodb, postgresql, tensorflow, keras, pytorch, sklearn, llm, langchain, opencv, cnn, openpose, paf, heatmap, object-detection, pose, image-processing, video, etl, data-modeling, pandas, powerbi, docker, cicd, git, linux, aws, gcp, prometheus, grafana, cloudwatch, logs, statistics, features, data-prep, rca",
        }),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    achievements: collection({
      label: "Achievements",
      slugField: "title",
      path: "content/achievements/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        date: fields.text({ label: "Date", description: "e.g. August 2025" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Patent", value: "patent" },
            { label: "Education", value: "education" },
            { label: "Award", value: "award" },
          ],
          defaultValue: "award",
        }),
        detail: fields.text({ label: "Detail Badge", description: "e.g. Patent number or GPA" }),
        description: fields.text({ label: "Description", multiline: true }),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    journey: collection({
      label: "Engineering Journey",
      slugField: "title",
      path: "content/journey/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        year: fields.text({ label: "Year", description: "e.g. 2025" }),
        subtitle: fields.text({ label: "Subtitle" }),
        description: fields.text({ label: "Description", multiline: true }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Education", value: "education" },
            { label: "Project", value: "project" },
            { label: "Research", value: "research" },
            { label: "Milestone", value: "milestone" },
            { label: "Goal", value: "goal" },
            { label: "Work", value: "work" },
          ],
          defaultValue: "milestone",
        }),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    expertise: collection({
      label: "Technical Expertise",
      slugField: "category",
      path: "content/expertise/*",
      format: { data: "yaml" },
      schema: {
        category: fields.slug({ name: { label: "Category" } }),
        items: stringList("Checklist Items"),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/blog/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        date: fields.text({ label: "Date" }),
        category: fields.text({ label: "Category" }),
        readTime: fields.text({ label: "Read Time", description: "e.g. 8 min read" }),
        url: fields.text({ label: "Article URL", description: "Optional — links the card to the full article" }),
      },
    }),
  },
});
