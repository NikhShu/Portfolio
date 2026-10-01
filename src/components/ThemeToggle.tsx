"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function getSnapshot(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    return "system";
  }
  return "system";
}

function getServerSnapshot(): Theme {
  return "system";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = resolveTheme(theme);
}

const listeners = new Set<() => void>();

function handleExternalChange() {
  applyTheme(getSnapshot());
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", handleExternalChange);
  window.addEventListener("storage", handleExternalChange);

  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", handleExternalChange);
    window.removeEventListener("storage", handleExternalChange);
  };
}

function setTheme(next: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable (private mode) — still apply for this visit
  }
  applyTheme(next);
  for (const listener of listeners) {
    listener();
  }
}

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const select = useCallback((next: Theme) => {
    setTheme(next);
  }, []);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-0.5 p-1 rounded-xl bg-card border border-border"
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => select(value)}
            aria-label={`${label} theme`}
            aria-pressed={active}
            title={`${label} theme`}
            className={`p-2 rounded-lg transition-colors ${
              active
                ? "bg-primary-muted text-primary"
                : "text-text-tertiary hover:text-text"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
