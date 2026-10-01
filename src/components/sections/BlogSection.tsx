"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { BlogPost } from "@/lib/content";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Knowledge Sharing"
          subtitle="Blog & Insights"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-border-light hover:bg-card-hover cursor-pointer"
            >
              {/* Category tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary-muted border border-border-light text-xs font-medium text-primary mb-4">
                {post.category}
              </div>

              <h3 className="font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
