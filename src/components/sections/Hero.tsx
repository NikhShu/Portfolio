"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import type { PersonalInfo } from "@/lib/content";

interface HeroProps {
  info: PersonalInfo;
}

export default function Hero({ info }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % info.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [info.roles]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-muted border border-border-light mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="text-text">Nikhil</span>{" "}
            <span className="text-gradient-hero">Shukla</span>
          </h1>

          {/* Dynamic role */}
          <div className="h-10 mb-6">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl text-text-secondary font-medium"
            >
              {info.roles[roleIndex]}
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-text-secondary leading-relaxed mb-10"
          >
            {info.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/20"
            >
              <ExternalLink className="w-4 h-4" />
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href={info.resumePath}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-text font-medium hover:bg-card hover:border-border-light transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-text-secondary font-medium hover:text-text transition-all duration-200"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <a
              href={info.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-text-tertiary"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
