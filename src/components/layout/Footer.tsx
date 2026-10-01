import { Heart, Github, Linkedin, Mail } from "lucide-react";
import type { PersonalInfo } from "@/lib/content";

interface FooterProps {
  contact: Pick<PersonalInfo, "email" | "linkedin" | "github">;
}

export default function Footer({ contact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold tracking-tight text-text">
              NS<span className="text-primary">.</span>
            </p>
            <p className="text-sm text-text-tertiary mt-1">
              AI/ML Engineer & Software Developer
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="p-2.5 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-tertiary flex items-center gap-1">
            &copy; {currentYear} Made with <Heart className="w-3.5 h-3.5 text-danger" /> by
            Nikhil Shukla
          </p>
        </div>
      </div>
    </footer>
  );
}
