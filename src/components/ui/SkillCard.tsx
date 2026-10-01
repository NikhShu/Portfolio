"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiC,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiFastapi,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiDocker,
  SiGit,
  SiLinux,
  SiGooglecloud,
  SiPrometheus,
  SiGrafana,
  SiPandas,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import type { ReactNode } from "react";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  index: number;
}

const iconMap: Record<string, ReactNode> = {
  python: <SiPython className="w-5 h-5" />,
  java: <FaJava className="w-5 h-5" />,
  c: <SiC className="w-5 h-5" />,
  javascript: <SiJavascript className="w-5 h-5" />,
  typescript: <SiTypescript className="w-5 h-5" />,
  react: <SiReact className="w-5 h-5" />,
  nextjs: <SiNextdotjs className="w-5 h-5" />,
  html5: <SiHtml5 className="w-5 h-5" />,
  tailwind: <SiTailwindcss className="w-5 h-5" />,
  nodejs: <SiNodedotjs className="w-5 h-5" />,
  fastapi: <SiFastapi className="w-5 h-5" />,
  mysql: <SiMysql className="w-5 h-5" />,
  mongodb: <SiMongodb className="w-5 h-5" />,
  postgresql: <SiPostgresql className="w-5 h-5" />,
  tensorflow: <SiTensorflow className="w-5 h-5" />,
  pytorch: <SiPytorch className="w-5 h-5" />,
  opencv: <SiOpencv className="w-5 h-5" />,
  docker: <SiDocker className="w-5 h-5" />,
  git: <SiGit className="w-5 h-5" />,
  linux: <SiLinux className="w-5 h-5" />,
  aws: <FaAws className="w-5 h-5" />,
  gcp: <SiGooglecloud className="w-5 h-5" />,
  prometheus: <SiPrometheus className="w-5 h-5" />,
  grafana: <SiGrafana className="w-5 h-5" />,
  pandas: <SiPandas className="w-5 h-5" />,
};

function getSkillIcon(iconName: string): ReactNode {
  return iconMap[iconName] || null;
}

export default function SkillCard({ title, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 h-full transition-all duration-300 hover:border-border-light hover:bg-card-hover hover:glow-indigo">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-5">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group/skill inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface border border-border text-xs font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all duration-200"
              title={skill.name}
            >
              <span className="opacity-70 group-hover/skill:opacity-100 transition-opacity">
                {getSkillIcon(skill.icon)}
              </span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
