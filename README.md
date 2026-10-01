# Nikhil Shukla — Portfolio

Single-page portfolio for Nikhil Shukla (AI/ML Engineer & Software Developer), built with Next.js 16 App Router.

The site is fully content-driven: projects, experience, skills, achievements, journey entries and the personal summary are managed through a built-in **Keystatic admin UI** and stored as YAML in the repo — no code changes needed to update your career content.

## Features

- **10 animated sections** — Hero, About, Skills, Experience, Projects, Technical Expertise, Achievements, Engineering Journey, GitHub, Contact — with Framer Motion scroll-reveal animations
- **Visual content admin** at `/keystatic` — add, edit or delete any content without touching code; every entry is a versioned YAML file
- **Working contact form** — client + server validation, email delivery via Resend
- **Live GitHub section** — real profile stats and repositories from the GitHub API (1-hour cache, graceful fallback to cached data)
- **Light / Dark / System theming** — navbar toggle, persisted per visitor, follows the OS preference in System mode, zero flash on load
- **Performance** — homepage prerenders as static HTML from content files; 9 of 11 sections are lazy-loaded
- **SEO & resilience** — metadata + OpenGraph, error boundary with retry, loading and 404 pages, security headers
- **Optional analytics** — Google Analytics 4 and Microsoft Clarity load only when their env vars are set

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme inline` design tokens, light + dark palettes) |
| Animation | Framer Motion |
| Content | Keystatic (git-based CMS, YAML files in `content/`) |
| Email | Resend |
| Icons | lucide-react, react-icons |

## Getting Started

Requirements: **Node.js 20+** and npm.

```bash
git clone https://github.com/NikhShu/Portfolio
cd Portfolio
npm install
npm run dev
```

- Site: <http://localhost:3000>
- Content admin: <http://localhost:3000/keystatic>

### Environment Variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Contact form recipient, shown on the site |
| `RESEND_API_KEY` | Yes | Sends contact form emails ([resend.com/api-keys](https://resend.com/api-keys)) |
| `RESEND_FROM_EMAIL` | No | Custom verified sender domain (defaults to Resend's sandbox) |
| `GITHUB_TOKEN` | No | GitHub API auth — raises 60 to 5,000 req/hr |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_CLARITY_ID` | No | Microsoft Clarity project ID |
| `KEYSTATIC_GITHUB_REPO` | Prod | `owner/repo` — enables admin commits to GitHub (see Deployment) |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Prod | GitHub OAuth app client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Prod | GitHub OAuth app client secret |
| `KEYSTATIC_SECRET` | Prod | Any long random string (session signing) |

## Content Management

All site content lives in `content/` as YAML — edited through the admin UI at `/keystatic`, or by hand if you prefer.

```
content/
├── personal-info.yaml    # Singleton: name, bios, socials, hero roles, SEO, highlights
├── projects/             # One file per project (problem/solution/architecture/features/…)
├── experience/           # Work history entries
├── skills/               # One file per skill (name, category, icon, order)
├── achievements/         # Patents, education, awards
├── journey/              # Engineering journey timeline
├── expertise/            # Technical expertise checklists
└── blog/                 # Blog post cards (section rendering is currently disabled)
```

**Local mode (default):** in development, admin edits write straight to `./content/` and hot-reload. Commit and push the changed YAML files to publish them.

**GitHub mode (production):** set `KEYSTATIC_GITHUB_REPO` + OAuth credentials and the admin UI commits content changes to your repo, triggering a Vercel redeploy automatically (setup steps are documented in `.env.example`).

Rendering is powered by a single typed data boundary in `src/lib/content.ts` (Keystatic reader + normalization). Sections never import content directly — they receive it as props.

## Theming

Three-way switcher (Light / Dark / System) in the navbar; the choice is stored in `localStorage` under the key `theme` and defaults to **System**.

- Palettes are plain CSS variables defined in `src/app/globals.css` — `:root` holds dark values, `[data-theme="light"]` overrides them, and Tailwind's `@theme inline` maps them to utilities (`bg-background`, `text-text`, `border-border`, …)
- A tiny blocking script in the root layout applies the saved theme before first paint (no flash)
- To re-brand, edit the CSS variables in `globals.css` — both themes live in one file

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Validates and emails contact form submissions via Resend |
| `/api/github` | GET | Live GitHub profile + repos (1-hour cache, optional `GITHUB_TOKEN`, fallback data) |
| `/api/keystatic/*` | — | Keystatic admin backend (content reads/writes, auth in GitHub mode) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root: fonts, analytics, pre-paint theme script, SEO
│   ├── globals.css             # Tailwind v4 + theme tokens (light/dark)
│   ├── not-found.tsx           # 404
│   ├── (site)/                 # Portfolio route group
│   │   ├── layout.tsx          # Navbar + Footer
│   │   ├── page.tsx            # Section composition (server component)
│   │   ├── loading.tsx         # Loading spinner
│   │   └── error.tsx           # Error boundary
│   ├── keystatic/              # Admin UI (client) at /keystatic
│   └── api/                    # contact, github, keystatic route handlers
├── components/
│   ├── layout/                 # Navbar (client), Footer
│   ├── sections/               # 11 section components (data via props)
│   ├── ui/                     # AnimatedSection, ProjectCard, SkillCard, …
│   ├── ThemeToggle.tsx         # Light/Dark/System switcher
│   └── Analytics.tsx           # GA4 + Clarity (conditional)
├── keystatic.config.ts         # Admin schema for every content entity
└── lib/
    └── content.ts              # Typed content layer (single data boundary)
```

## Scripts

```bash
npm run dev     # Start dev server (Turbopack)
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # ESLint (core-web-vitals + TS)
```

## Deployment

The site deploys to [Vercel](https://vercel.com) out of the box — the homepage is fully static.

For production content editing through `/keystatic`, switch the admin to GitHub mode:

1. Set `KEYSTATIC_GITHUB_REPO=NikhShu/Portfolio` in your Vercel env vars
2. Create a [GitHub OAuth App](https://github.com/settings/developers) with callback URL `https://<your-domain>/api/keystatic/created`
3. Set `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET` and `KEYSTATIC_SECRET`
4. Add the same variables locally in `.env.local` if you want to test GitHub mode in dev

Admin edits then commit straight to the repo, and Vercel redeploys automatically.
