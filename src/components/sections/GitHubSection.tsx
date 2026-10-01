"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  BookOpen,
  ExternalLink,
  Users,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface GitHubSectionProps {
  githubUrl: string;
}

interface Repo {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
  topics: string[];
}

interface GitHubData {
  username: string;
  avatarUrl?: string;
  bio?: string;
  totalRepos: number;
  followers?: number;
  following?: number;
  totalStars: number;
  totalForks: number;
  repos: Repo[];
  fallback?: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Rust: "#dea584",
  Go: "#00ADD8",
};

function StatSkeleton() {
  return (
    <div className="text-center p-4 rounded-2xl bg-card border border-border animate-pulse">
      <div className="w-5 h-5 rounded bg-border mx-auto mb-2" />
      <div className="h-7 w-10 rounded bg-border mx-auto mb-1" />
      <div className="h-3 w-16 rounded bg-border mx-auto mt-1" />
    </div>
  );
}

function RepoSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-5 h-5 rounded bg-border" />
        <div className="w-4 h-4 rounded bg-border" />
      </div>
      <div className="h-4 w-3/4 rounded bg-border mb-2" />
      <div className="h-3 w-full rounded bg-border mb-1" />
      <div className="h-3 w-2/3 rounded bg-border mb-3" />
      <div className="flex gap-3">
        <div className="h-3 w-14 rounded bg-border" />
        <div className="h-3 w-8 rounded bg-border" />
        <div className="h-3 w-8 rounded bg-border" />
      </div>
    </div>
  );
}

export default function GitHubSection({ githubUrl }: GitHubSectionProps) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: GitHubData) => setData(json))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const stats = data
    ? [
        { label: "Repositories", value: data.totalRepos, icon: BookOpen },
        { label: "Stars Earned", value: data.totalStars, icon: Star },
        { label: "Total Forks", value: data.totalForks, icon: GitFork },
        ...(data.followers !== undefined
          ? [{ label: "Followers", value: data.followers, icon: Users }]
          : []),
      ]
    : [];

  return (
    <section id="github" className="relative py-24 md:py-32 bg-surface/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="GitHub" subtitle="Open Source" />

        {/* Stats */}
        <AnimatedSection className="mb-12">
          <div
            className={`grid gap-4 max-w-2xl mx-auto ${
              loading ? "grid-cols-3" : `grid-cols-${Math.min(stats.length, 4)}`
            }`}
            style={{
              gridTemplateColumns: loading
                ? "repeat(3, minmax(0, 1fr))"
                : `repeat(${Math.min(stats.length, 4)}, minmax(0, 1fr))`,
            }}
          >
            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : error ? (
              <div className="col-span-full text-center text-text-secondary text-sm py-4">
                Could not load GitHub stats.
              </div>
            ) : (
              stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-card border border-border"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-tertiary mt-1">
                    {stat.label}
                  </div>
                </div>
              ))
            )}
          </div>
        </AnimatedSection>

        {/* Repo cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full text-center text-text-secondary text-sm py-8">
              <Loader2 className="w-5 h-5 mx-auto mb-2 opacity-50" />
              Could not load repositories.
            </div>
          ) : (
            data?.repos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-border-light hover:bg-card-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <Github className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                  <ExternalLink className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-medium text-text text-sm mb-1.5 group-hover:text-primary transition-colors truncate">
                  {repo.name}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
                  {repo.description || "No description"}
                </p>
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[repo.language] || "#8b8b8b",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {repo.forks}
                  </span>
                </div>
              </motion.a>
            ))
          )}
        </div>

        {/* Fallback notice */}
        {data?.fallback && (
          <p className="text-center text-xs text-text-tertiary mt-4">
            Showing cached data — live GitHub stats temporarily unavailable.
          </p>
        )}

        {/* Profile link */}
        <AnimatedSection className="text-center mt-10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            View all repositories on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
