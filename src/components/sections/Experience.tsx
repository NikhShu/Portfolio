"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Calendar, Tag } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { ExperienceItem } from "@/lib/content";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="Where I've Worked"
        />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                {/* Top accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-primary to-accent" />

                <div className="mt-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold text-text">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.organization}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-muted text-primary text-xs font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
