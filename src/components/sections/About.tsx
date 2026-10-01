"use client";

import { motion } from "framer-motion";
import { Quote, Lightbulb, Target, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Highlight, PersonalInfo } from "@/lib/content";

interface AboutProps {
  info: PersonalInfo;
}

const highlightIcons = {
  lightbulb: Lightbulb,
  target: Target,
  zap: Zap,
} as const;

function getHighlightIcon(icon: Highlight["icon"]) {
  return highlightIcons[icon] ?? Lightbulb;
}

export default function About({ info }: AboutProps) {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="About Me"
          subtitle="Who I Am"
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left - Long Bio */}
          <AnimatedSection
            className="lg:col-span-3"
            direction="left"
          >
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
              <div className="space-y-4 text-text-secondary leading-relaxed text-[15px] pl-4">
                {info.longBio.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="mt-8 p-6 rounded-2xl bg-primary-muted border border-primary/20">
              <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Personal Mission
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {info.personalMission}
              </p>
            </div>

            {/* Elevator pitch */}
            <div className="mt-4 p-6 rounded-2xl bg-accent-muted border border-accent/20">
              <h4 className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Elevator Pitch
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {info.elevatorPitch}
              </p>
            </div>
          </AnimatedSection>

          {/* Right - Highlights */}
          <AnimatedSection
            className="lg:col-span-2"
            direction="right"
            delay={0.2}
          >
            <div className="space-y-4">
              {info.highlights.map((item, i) => {
                const HighlightIcon = getHighlightIcon(item.icon);

                return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-5 rounded-2xl bg-card border border-border hover:border-border-light transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <HighlightIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
