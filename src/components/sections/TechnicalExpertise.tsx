"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Eye,
  Settings,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ExpertiseArea } from "@/lib/content";

interface TechnicalExpertiseProps {
  expertise: ExpertiseArea[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Software Engineering": <Code2 className="w-5 h-5" />,
  "Artificial Intelligence": <Brain className="w-5 h-5" />,
  "Computer Vision": <Eye className="w-5 h-5" />,
  "Production Engineering": <Settings className="w-5 h-5" />,
};

export default function TechnicalExpertise({
  expertise,
}: TechnicalExpertiseProps) {
  return (
    <section id="expertise" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Technical Expertise"
          subtitle="What I Specialize In"
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {expertise.map((area, index) => (
            <motion.div
              key={area.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-border-light hover:bg-card-hover"
            >
              {/* Hover glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-primary-muted text-primary">
                    {categoryIcons[area.category] || <Code2 className="w-5 h-5" />}
                  </div>
                  <h3 className="font-semibold text-text">{area.category}</h3>
                </div>

                <ul className="space-y-2.5">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
