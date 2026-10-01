"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Sparkles, Target, FlaskConical } from "lucide-react";

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    type: string;
  };
  index: number;
  isLast: boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap className="w-4 h-4" />,
  project: <Briefcase className="w-4 h-4" />,
  research: <FlaskConical className="w-4 h-4" />,
  milestone: <Award className="w-4 h-4" />,
  goal: <Target className="w-4 h-4" />,
  work: <Briefcase className="w-4 h-4" />,
};

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative flex gap-6 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border timeline-line" />
      )}

      {/* Dot */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary z-10 relative">
          {typeIcons[item.type] || <Sparkles className="w-4 h-4" />}
        </div>
        {item.type === "milestone" && (
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-mono font-medium text-primary bg-primary-muted px-2 py-0.5 rounded-full">
            {item.year}
          </span>
          <span className="text-xs text-text-tertiary">{item.subtitle}</span>
        </div>
        <h3 className="text-lg font-semibold text-text mb-1">{item.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
