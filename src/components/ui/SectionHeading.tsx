"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={`mb-16 md:mb-20 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex mb-4 px-3 py-1 rounded-full bg-primary-muted border border-border-light">
          <span className="text-xs font-medium tracking-widest uppercase text-primary">
            {subtitle || "Section"}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text">
          {title}
        </h2>
      </div>
    </AnimatedSection>
  );
}
