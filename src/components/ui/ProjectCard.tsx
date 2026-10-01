"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Award,
  CheckCircle2,
} from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    tagline: string;
    category: string;
    problem: string;
    solution: string;
    architecture?: string[];
    features: string[];
    technologies: string[];
    challenges: string[];
    results: string;
    github?: string;
    demo?: string;
    patent?: string;
    patentDate?: string;
    featured?: boolean;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
            <Award className="w-3 h-3" />
            Featured Project
          </div>
        </div>
      )}

      {/* Patent badge */}
      {project.patent && (
        <div className="absolute -top-3 -left-3 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-background text-xs font-semibold rounded-full shadow-lg">
            <CheckCircle2 className="w-3 h-3" />
            Patent Published
          </div>
        </div>
      )}

      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-border-light hover:bg-card-hover cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top gradient line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-primary via-accent to-transparent" />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-muted border border-border-light text-xs font-medium text-primary mb-3">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-text leading-tight">
                {project.title}
              </h3>
              <p className="mt-1.5 text-text-secondary">{project.tagline}</p>
            </div>
          </div>

          {/* Problem & Solution - always visible */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-danger mb-2">
                Problem
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-success mb-2">
                Solution
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-primary-muted text-primary text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expand/Collapse */}
          <button
            className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Show Details
              </>
            )}
          </button>

          {/* Expanded content */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-border space-y-6"
            >
              {/* Architecture */}
              {project.architecture && (
                <div>
                  <h4 className="text-sm font-semibold text-text mb-3">
                    Architecture
                  </h4>
                  <ul className="space-y-2">
                    {project.architecture.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-text mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="text-sm font-semibold text-text mb-3">
                  Challenges Solved
                </h4>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="p-4 rounded-xl bg-primary-muted border border-primary/20">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  Results & Impact
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.results}
                </p>
              </div>
            </motion.div>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.patent && (
              <span className="flex items-center gap-1.5 text-sm text-accent ml-auto">
                <Award className="w-4 h-4" />
                Patent #{project.patent}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
