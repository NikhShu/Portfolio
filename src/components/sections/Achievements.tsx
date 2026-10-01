"use client";

import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  FileText,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Achievement } from "@/lib/content";

interface AchievementsProps {
  achievements: Achievement[];
}

const typeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  patent: {
    icon: <FileText className="w-5 h-5" />,
    color: "text-accent",
    bgColor: "bg-accent-muted",
  },
  education: {
    icon: <GraduationCap className="w-5 h-5" />,
    color: "text-primary",
    bgColor: "bg-primary-muted",
  },
  award: {
    icon: <Award className="w-5 h-5" />,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
};

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-surface/50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Achievements"
          subtitle="My Milestones"
        />

        <div className="space-y-6">
          {achievements.map((item, index) => {
            const config = typeConfig[item.type] || typeConfig.award;

            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-border-light"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${config.bgColor} ${config.color} flex-shrink-0`}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h3 className="font-semibold text-text">
                          {item.title}
                        </h3>
                        <span className="text-xs text-text-tertiary whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm text-primary mb-2">{item.subtitle}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                      {item.detail && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                          {item.detail}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
