"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import type { JourneyItem } from "@/lib/content";

interface EngineeringJourneyProps {
  journey: JourneyItem[];
}

export default function EngineeringJourney({ journey }: EngineeringJourneyProps) {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          title="Engineering Journey"
          subtitle="My Path"
        />

        <div className="relative">
          {/* Top glow dot */}
          <div className="absolute -top-1 left-[19px] w-2 h-2 rounded-full bg-primary glow-indigo" />

          {journey.map((item, index) => (
            <TimelineItem
              key={`${item.year}-${item.title}`}
              item={item}
              index={index}
              isLast={index === journey.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
