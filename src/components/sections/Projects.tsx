"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/content";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-surface/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Projects"
          subtitle="What I've Built"
        />

        {/* Featured projects */}
        <div className="space-y-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-lg font-semibold text-text-secondary">
                More Projects
              </h3>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
