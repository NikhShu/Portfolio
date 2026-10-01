"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import type { Skill } from "@/lib/content";

interface SkillsProps {
  categories: [string, Skill[]][];
}

export default function Skills({ categories }: SkillsProps) {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-surface/50">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="What I Work With"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([category, skillList], index) => (
            <SkillCard
              key={category}
              title={category}
              skills={skillList}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
