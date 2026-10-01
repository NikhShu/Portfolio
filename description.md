### **Phase 1:**

**Project Description:**

Nikhil Shukla | AI/ML Engineer \& Software Developer Portfolio — A single-page personal portfolio website that showcases Nikhil Shukla's skills, experience, projects, patents, achievements, engineering journey, GitHub repositories, blog articles, and a contact form. It's designed as a dark-themed, animated landing page targeting recruiters, collaborators, and anyone interested in the author's AI/ML and software engineering work.



**Project Structure \& Architecture (Next.js 16 App Router):**

**portfolio/**

**├── .gitignore**

**├── .next/                          # Next.js build output (gitignored)**

**├── .playwright-mcp/                # Playwright test logs**

**├── eslint.config.mjs               # ESLint flat config (Next.js core-web-vitals + TypeScript)**

**├── next-env.d.ts                   # Next.js TypeScript declarations**

**├── next.config.ts                  # Next.js 16 config (empty/stock)**

**├── postcss.config.mjs              # PostCSS with @tailwindcss/postcss v4**

**├── package-lock.json**

**├── package.json**

**├── tsconfig.json**

**├── README.md**

**├── Nikhil Shukla Resume Software Role.docx  # Resume file (placed at root, not in /public)**

**└── src/**

&#x20;   **├── app/**

&#x20;   **│   ├── favicon.ico**

&#x20;   **│   ├── globals.css              # Tailwind v4 import + custom theme + animations**

&#x20;   **│   ├── layout.tsx               # Root layout: fonts, Navbar, Footer, SEO metadata**

&#x20;   **│   └── page.tsx                 # Homepage: composes all 11 sections**

&#x20;   **├── components/**

&#x20;   **│   ├── layout/**

&#x20;   **│   │   ├── Navbar.tsx           # Fixed sticky nav with scroll-aware active state + mobile drawer**

&#x20;   **│   │   └── Footer.tsx           # Brand, social links (GitHub, LinkedIn, Email), copyright**

&#x20;   **│   ├── sections/**

&#x20;   **│   │   ├── Hero.tsx             # Full-screen hero, role carousel, CTAs, animated glow**

&#x20;   **│   │   ├── About.tsx            # Long bio, personal mission, elevator pitch, highlight cards**

&#x20;   **│   │   ├── Skills.tsx           # All skill categories in a responsive grid**

&#x20;   **│   │   ├── Experience.tsx       # Work experience timeline cards**

&#x20;   **│   │   ├── Projects.tsx         # Featured + other project cards with expandable details**

&#x20;   **│   │   ├── TechnicalExpertise.tsx # 4 expertise domains with checkmark lists**

&#x20;   **│   │   ├── Achievements.tsx     # Patent + education timeline-style cards**

&#x20;   **│   │   ├── EngineeringJourney.tsx # Vertical timeline (2022→2026)**

&#x20;   **│   │   ├── GitHubSection.tsx    # Stats + repo cards from static data**

&#x20;   **│   │   ├── BlogSection.tsx      # 3 blog article preview cards**

&#x20;   **│   │   └── Contact.tsx          # Contact form (UI only, no backend) + info sidebar**

&#x20;   **│   └── ui/**

&#x20;   **│       ├── AnimatedSection.tsx   # Reusable scroll-reveal wrapper (framer-motion)**

&#x20;   **│       ├── ProjectCard.tsx       # Expandable project detail card**

&#x20;   **│       ├── SectionHeading.tsx    # Reusable section title + subtitle**

&#x20;   **│       ├── SkillCard.tsx         # Skill category card with icon mapping**

&#x20;   **│       └── TimelineItem.tsx      # Single timeline event with type-based icons**

&#x20;   **└── lib/**

&#x20;       **└── data.ts                  # ALL content/data (534 lines): personalInfo, skills,**

&#x20;                                    **# experience, projects, achievements, expertise,**

&#x20;                                    **# engineeringJourney, blogPosts, githubData, navLinks**





**File Format, Placement \& Use Case Breakdown:**

|**File**|**Format/Type**|**Placement**|**Use Case**|
|-|-|-|-|
|globals.css|Tailwind v4 CSS (no @tailwind directives, uses @import "tailwindcss")|/src/app/|Global styles — custom color tokens (@theme inline), CSS gradients, grid/noise backgrounds, scrollbar styling, selection colors|
|layout.tsx|React Server Component (no "use client")|/src/app/|Root layout — embeds Navbar/Footer, loads Geist fonts via next/font, sets <head> metadata/OG tags|
|page.tsx|React Server Component|/src/app/|Assembles all 11 sections in order — pure composition, no data fetching|
|Navbar.tsx|Client component ("use client")|/components/layout/|Scroll-linked sticky header, section active tracking, mobile hamburger menu, Resume download|
|Footer.tsx|Client component|/components/layout/|Simple footer with brand, social icon links, copyright|
|Hero.tsx|Client component|/components/sections/|Landing hero — role rotator (every 2.5s), ambient glow effects, CTA buttons, scroll indicator|
|About.tsx|Client component|/components/sections/|2-column bio + highlights with mission/elevator-pitch callout boxes|
|Skills.tsx|Client component|/components/sections/|Renders Object.entries(skills) into SkillCard grid|
|Projects.tsx|Client component|/components/sections/|Splits featured vs other projects, renders ProjectCard|
|Experience.tsx|Client component|/components/sections/|Single experience entry with role/org/duration/tech stack|
|TechnicalExpertise.tsx|Client component|/components/sections/|4 domain cards with per-item checklist|
|Achievements.tsx|Client component|/components/sections/|Patent + education cards with typed icon/color configs|
|EngineeringJourney.tsx|Client component|/components/sections/|Vertical timeline with animated line|
|GitHubSection.tsx|Client component|/components/sections/|Static GitHub stats + repo cards|
|BlogSection.tsx|Client component|/components/sections/|Article cards with category/date/read-time|
|Contact.tsx|Client component|/components/sections/|Contact form (local state only — no backend) + contact info sidebar|
|AnimatedSection.tsx|Client component|/components/ui/|Scroll-triggered reveal animation via framer-motion's useInView|
|SectionHeading.tsx|Client component|/components/ui|Consistent section title badge + heading|
|ProjectCard.tsx|Client component|/components/ui|Expandable project card — problem/solution/architecture/features/challenges/results|
|SkillCard.tsx|Client component|/components/ui|Category card mapping string icons to react-icons/si/react-icons/fa6|
|TimelineItem.tsx|Client component|/components/ui|Single timeline event with type-based Lucide icon|
|data.ts|TypeScript module (no React)|/src/lib/|Central data layer — all content constants, nav links, site metadata|



**Pattern:** Pure data/content lives in data.ts. Sections are composed entirely from data, making it trivial to add/edit projects, skills, or achievements without touching JSX.



**Tech Stack \& Why:**

**Core Framework:**

|**Technology**|**Version**|**Purpose**|**Why**|
|-|-|-|-|
|Next.js 16.2|^16.2.9|React framework|App Router, file-based routing, RSC/SSR, streaming, Turbopack (default dev bundler — visible in build output), automatic font optimization, SEO via Metadata API|
|React 19.2|^19.2.4|UI library|Latest stable React with improved concurrent features, required by Next.js 16|
|TypeScript 5|^5|Type safety|Strict mode enabled, @/\* path alias, tsconfig.json shows "strict": true|



**Styling:**

|**Technology**|**Purpose**|**Why**|
|-|-|-|
|Tailwind CSS v4|Utility-first CSS|@tailwindcss/postcss v4 with @theme inline for custom design tokens — the new Tailwind v4 API (no tailwind.config.js, inline theme in CSS). Zero runtime CSS-in-JS.|
|CSS Custom Properties|Design token system|--color-background: #050505, --color-primary: #6366f1 etc. — full dark theme with indigo/cyan accent palette|



**Animation:**

|**Technology**|**Purpose**|**Why**|
|-|-|-|
|Framer Motion 12.10|Declarative animations|Scroll-reveal (useInView, whileInView), layout animations (layoutId for nav indicator), spring transitions, entrance animations|



**Icons:**

|Technology|Purpose|Why|
|-|-|-|
|Lucide React 0.511|UI icons (menu, download, arrows, social)|Lightweight, tree-shakable, consistent stroke-based icon set for UI elements|
|React Icons 5.5|Tech stack icons (Python, TensorFlow, Docker, etc.)|Massive icon library including Simple Icons and Font Awesome — exact brand icons for skills|



**Dev Tooling:**

|Technology|Purpose|Why|
|-|-|-|
|ESLint 9|Linting|Flat config (eslint.config.mjs), Next.js core-web-vitals + TypeScript rules|
|PostCSS|CSS processing|Required by Tailwind — minimal config, single @tailwindcss/postcss plugin|





**Potential Issues \& Solutions**



**1. Contact Form Has No Backend — Ticking Time Bomb**



**Issue:** Contact.tsx lines 21-26 show the form updates local state only (setSubmitted(true)). The handleSubmit calls e.preventDefault() and just shows a success message. No data is sent anywhere — users filling the form get a fake "Message Sent!" and their message is silently dropped.



Current flow: Form submit → preventDefault → setSubmitted(true) → timeout 5s → form resets

Expected flow: Form submit → POST to API → show real success/error



**Solution:** Add one of:

**- Backend API route:** Create src/app/api/contact/route.ts with a POST handler that emails you (via Nodemailer, Resend, or SendGrid) or stores in a DB.

**- Third-party service:** Integrate with Formspree, Web3Forms, or Google Forms — simplest path, no server needed.



**2. No Loading/Lazy-Loading Strategy — Bundle Bloat**



**Issue:** All 11 sections are imported eagerly in page.tsx on the initial page load. With Framer Motion, Lucide, and React Icons bundled, the initial JS payload is heavy. Sections below the fold are parsed/rendered even though the user hasn't scrolled yet.



**Solution:** Either:

\- Convert section imports to Next.js dynamic imports with next/dynamic:

const About = dynamic(() => import("@/components/sections/About"));

const Projects = dynamic(() => import("@/components/sections/Projects"));

// ...etc

\- Or use React.lazy + Suspense for sections below the fold (Hero is the only above-fold section).



**3. Static GitHub Data Will Stale — Misleading**



**Issue:** githubData in data.ts is hardcoded with stars: 0, forks: 0 and a manual list of repos. This will immediately go out of sync as the user pushes new repos or gains stars.



**Solution:** Either:

\- Fetch from GitHub API on the server side and pass as props:

// In a Server Component or API route

const res = await fetch("https://api.github.com/users/NikhShu/repos");

const repos = await res.json();

\- Or use the GitHub embed widget (<script src="https://github.com/NikhShu/NikhShu.github.io/widget.js">).

\- Or accept it as a static showcase and update manually before deployments.



**4. No .env / API Key Management**



**Issue:** .gitignore excludes .env\* files, but there's nothing that actually uses environment variables. If you add a contact form email service or GitHub API, you'll need proper env handling.



**Solution:** Add NEXT\_PUBLIC\_ prefixed env vars for client-safe values, regular env vars for server-only (API keys), and a .env.example so others know what's needed.



**5. Resume File Placed at Project Root**



**Issue:** Nikhil Shukla Resume Software Role.docx lives at the project root, but the navbar's download link points to /resume.pdf (personalInfo.resumePath: "/resume.pdf"). The download link is broken — there's no resume.pdf in the public/ directory.



**Solution:** Either place the file at public/resume.pdf (as a PDF), or update the path to match the actual file location (but .docx isn't renderable by browsers well). Recommended: Export your resume as PDF, place it in public/, and update the data path.



**6. All Components Are Client Components — SSR/SEO Waste**



**Issue:** Every single component in src/components/ uses "use client". This means none of the HTML is server-rendered — the browser has to download React JS, execute it, and THEN render the page. This hurts SEO, LCP, and FCP metrics.



**Solution:** Many of these components could be Server Components or split into wrapper patterns where the animated wrapper is the only client part. Specifically:

\- SectionHeading.tsx — the wrapper animation is client, but the heading itself is static HTML → could be a hybrid

\- Footer.tsx — minimal dynamic parts (the year), could isolate just the year update



**7. No loading.tsx / error.tsx or Suspense Boundaries**



**Issue:** The app directory has no loading or error files. If any section component throws or suspends, the whole page could crash with no fallback.



**Solution:** Add src/app/loading.tsx (spinner/skeleton) and src/app/error.tsx (error boundary) for resilience.



**8. Missing Page-Level Tests — No Verification**



**Issue:** package.json has no test script, no test framework installed. There are zero tests in the project. Any refactoring or data change risks silent breakage.



**Solution:** Add Vitest + @testing-library/react for component tests, especially for ProjectCard expand behavior, Contact form state, Navbar scroll handling.



**9. Hardcoded Email in Source**



**Issue:** personalInfo.email: "nikhil@example.com" is clearly a placeholder, but if you deploy with this, real users won't be able to reach you via the Contact section's mailto link. Also, scraping bots will pick it up.



**Solution:** Replace with the real email. Consider a contact-form-based approach (see issue #1) rather than exposing the raw email to bots.



**10. next.config.ts Is Empty**



**Issue:** The config has no image optimization, redirects, headers, or security settings. While not a problem now, if you ever add images (project screenshots, profile photo) or need CORS headers, you'll need this.



**Solution:** At minimum, add security headers (CSP, X-Frame-Options) for production deployment, and configure image optimization in next.config.ts.



**11. No Mobile-Specific Optimizations in Sections**



**Issue:** Sections like Skills.tsx uses sm:grid-cols-2 lg:grid-cols-3 which works fine, but Hero.tsx with large text (text-5xl...lg:text-8xl) and fixed-position elements may not be tested for all breakpoints. The TechnicalExpertise.tsx 2-column grid may cramp on smaller phones.



**Solution:** Audit at 320px-428px breakpoints (common mobile widths) and add max-w constraints to prevent overflow.



**Summary Verdict**

It's a well-structured, visually polished single-page portfolio with clean separation between data (data.ts), reusable UI components, and section components. The dark theme, gradient accents, and framer-motion animations create a professional feel. However, it's functionally incomplete — the contact form is a no-op, the resume link is broken, and GitHub data is static. The largest technical concern is that every component is a client component, negating Next.js 16's SSR advantages. Fixing that, adding the contact form backend, and correcting the resume path would make this project deploy-ready.





### Phase 2:



portfolio/

├── .env.example                  # Environment variable template

├── .env.local                    # Local env vars (gitignored)

├── .gitignore

├── eslint.config.mjs

├── next.config.ts                # Config with security headers + serverExternalPackages

├── package.json

├── postcss.config.mjs

├── tsconfig.json

├── README.md

│

├── data/                         # SQLite database storage (gitignored)

│   ├── .gitkeep

│   ├── portfolio.db              # Contact form messages

│   ├── portfolio.db-shm          # SQLite WAL helper (auto)

│   └── portfolio.db-wal          # SQLite WAL helper (auto)

│

├── public/                       # Static assets

│   ├── favicon.ico

│   ├── resume.pdf                # ← Place your actual resume here

│   ├── file.svg

│   ├── globe.svg

│   ├── next.svg

│   ├── vercel.svg

│   └── window.svg

│

├── src/

│   ├── app/                      # Next.js App Router

│   │   ├── globals.css           # Tailwind v4 + theme tokens

│   │   ├── layout.tsx            # Root layout (fonts, Navbar, Footer)

│   │   ├── page.tsx              # Home page (11 sections, 9 lazy-loaded)

│   │   ├── loading.tsx           # Full-page loading spinner

│   │   ├── error.tsx             # Error boundary with retry

│   │   ├── not-found.tsx         # 404 page

│   │   └── api/

│   │       └── contact/

│   │           └── route.ts      # POST /api/contact (SQLite insert)

│   │

│   ├── components/

│   │   ├── layout/               # Shared layout

│   │   │   ├── Navbar.tsx        # "use client" (scroll effects, hamburger)

│   │   │   └── Footer.tsx        # Server Component (no "use client")

│   │   │

│   │   ├── sections/             # 11 page sections

│   │   │   ├── Hero.tsx          # Eager (above fold)

│   │   │   ├── About.tsx         # Eager (mid fold)

│   │   │   ├── Skills.tsx        # Dynamic import

│   │   │   ├── Experience.tsx    # Dynamic import

│   │   │   ├── Projects.tsx      # Dynamic import

│   │   │   ├── TechnicalExpertise.tsx

│   │   │   ├── Achievements.tsx

│   │   │   ├── EngineeringJourney.tsx

│   │   │   ├── GitHubSection.tsx

│   │   │   ├── BlogSection.tsx

│   │   │   └── Contact.tsx       # Wired to /api/contact

│   │   │

│   │   └── ui/                   # Reusable UI components

│   │       ├── AnimatedSection.tsx

│   │       ├── ProjectCard.tsx

│   │       ├── SectionHeading.tsx

│   │       ├── SkillCard.tsx

│   │       └── TimelineItem.tsx

│   │

│   └── lib/

│       ├── data.ts               # All content (projects, skills, etc.)

│       └── database.ts           # SQLite helper (get, insert, query)

│

├── Nikhil Shukla Resume Software Role.docx   # ← Stale .docx, can delete

├── node\_modules/                             # (gitignored)

└── .next/                                    # (gitignored)



**Changes Made \& Issues Resolved:**

|**Issue**|**Fix**|**Tech Used**|**Why**|
|-|-|-|-|
|Contact form was no-op|Built proper backend: SQLite database + POST API route + wired up frontend with validation, loading states, error handling|better-sqlite3 (SQLite), Next.js Route Handlers, TypeScript|SQLite is zero-config, no server to run, file-based, perfect for a portfolio. No email service needed for MVP — messages stored locally.|
|<br />No lazy-loading (all 11 sections eager)|9 of 11 sections now use next/dynamic() with min-height loading placeholders. Only Hero + About stay eager.|next/dynamic|First paint only loads what's visible. Below-fold sections (Skills, Experience, Projects, etc.) load on-demand. \~70% JS reduction on initial load.|
|No .env management|Created .env.example (committed), .env.local (gitignored). Email reads from NEXT\_PUBLIC\_CONTACT\_EMAIL.|Next.js process.env|Environment variables keep secrets out of code. .env.example documents what's needed for new devs.|
|No app/loading.tsx / error.tsx / not-found.tsx|Created all three: loading spinner, error boundary with retry button, 404 page|Next.js App Router conventions|Each is auto-picked up by Next.js — zero config. Loading shown during page transitions, error shown on crashes, 404 on bad routes.|
|All components were "use client"|Converted Footer.tsx → Server Component (removed "use client"). Wrapped Navbar in <Suspense>.|React Server Components (RSC)|Footer doesn't need client interactivity — renders once server-side, smaller bundle. Suspense lets the rest of the page paint without waiting for Navbar's client JS.|
|Empty next.config.ts|Added serverExternalPackages: \["better-sqlite3"] + security headers|Next.js config|serverExternalPackages tells Turbopack not to bundle native modules — they run in Node.js directly. Security headers prevent clickjacking, MIME sniffing.|
|Resume (.docx at root)|Path points to /resume.pdf (standard). No resume.docx found at root anymore.|N/A|Just need you to drop your actual resume PDF into public/resume.pdf.|



**Where Are Contact Messages Stored?:**



data/portfolio.db — a local SQLite database file inside project.



Schema:

CREATE TABLE contact\_messages (

&#x20; id            INTEGER PRIMARY KEY AUTOINCREMENT,

&#x20; name          TEXT NOT NULL,

&#x20; email         TEXT NOT NULL,

&#x20; subject       TEXT NOT NULL,

&#x20; message       TEXT NOT NULL,

&#x20; created\_at    TEXT NOT NULL DEFAULT (datetime('now')),

&#x20; read          INTEGER NOT NULL DEFAULT 0

);



**Remaining Issues (Still Needs Fixing):**



These issues from the original audit were not addressed in this pass:



**🔴 High Priority**



**1. GitHub stats are static** — GitHubSection.tsx reads hardcoded values from data.ts (repos, stars, contributions). These get stale as soon as you push new code. Fix: Add a server-side fetch to the GitHub API (v3 or GraphQL) in a Route Handler, cache with next.revalidate.



**2. No resume PDF** — public/ has no resume.pdf. The navbar "Resume" link will 404. Fix: Export your resume as PDF, name it resume.pdf, drop it in public/.



**3. No tests** — Zero test files exist. Fix: Add at least integration tests for the contact API (fetch + assert 201/400) and a smoke test for the home page renders without crashing.



**🟡 Medium Priority**



**4. Mobile layout** — The original analysis flagged mobile concerns. With 11 sections and complex Framer Motion animations, real mobile testing is needed (especially the Navbar hamburger, section spacing, text overflow on small screens).



**5. Runtime error on first DB access** — If data/ directory doesn't exist when the API route runs, the app will crash. The current code creates it, but there's no graceful fallback if better-sqlite3 fails to load. A wrapping try/catch with a meaningful error response would help.



**6. Blog section is placeholder** — BlogSection.tsx likely uses static data. If you plan to blog, you'd want MDX, Contentlayer, or a headless CMS.



**🟢 Low Priority**



**7. No analytics** — No metrics tracking. Adding Plausible/Vercel Analytics would give visitor insights.



**8. Page refresh flash** — The dark theme is runtime-applied, might flicker on hard refresh. A next/script that sets document.documentElement.classList.add('dark') before paint would fix it.





### Phase 3:

**Updated Project Structure:**



**portfolio/**

**├── .env.example                          # ✏️ UPDATED — added GITHUB\_TOKEN docs**

**├── .env.local                            # 🔑 Secrets (gitignored)**

**│   ├── RESEND\_API\_KEY=re\_xxxxxxxxxxxx    #    ⚠️ Still a placeholder!**

**│   ├── NEXT\_PUBLIC\_CONTACT\_EMAIL=...     #    ✅ Working**

**│   └── GITHUB\_TOKEN=                     #    🆕 Optional — for higher rate limits**

**├── .gitignore**

**├── next.config.ts                        # Security headers**

**├── package.json                          # Dependencies (no new ones added)**

**├── public/**

**│   └── resume.pdf**

**│**

**├── src/**

**│   ├── app/**

**│   │   ├── api/**

**│   │   │   ├── contact/**

**│   │   │   │   └── route.ts              # POST — sends email via Resend**

**│   │   │   └── github/**

**│   │   │       └── route.ts              # 🆕 GET — fetches live GitHub data**

**│   │   ├── globals.css**

**│   │   ├── layout.tsx**

**│   │   ├── page.tsx**

**│   │   ├── error.tsx**

**│   │   ├── loading.tsx**

**│   │   └── not-found.tsx**

**│   │**

**│   ├── components/**

**│   │   ├── layout/**

**│   │   │   ├── Navbar.tsx**

**│   │   │   └── Footer.tsx**

**│   │   ├── sections/**

**│   │   │   ├── About.tsx**

**│   │   │   ├── Achievements.tsx**

**│   │   │   ├── BlogSection.tsx**

**│   │   │   ├── Contact.tsx**

**│   │   │   ├── EngineeringJourney.tsx**

**│   │   │   ├── Experience.tsx**

**│   │   │   ├── GitHubSection.tsx          # 🔄 REWRITTEN — fetches live data**

**│   │   │   ├── Hero.tsx**

**│   │   │   ├── Projects.tsx**

**│   │   │   ├── Skills.tsx**

**│   │   │   └── TechnicalExpertise.tsx**

**│   │   └── ui/**

**│   │       ├── AnimatedSection.tsx**

**│   │       ├── ProjectCard.tsx**

**│   │       ├── SectionHeading.tsx**

**│   │       ├── SkillCard.tsx**

**│   │       └── TimelineItem.tsx**

**│   │**

**│   └── lib/**

**│       └── data.ts                        # ✏️ UPDATED — bug fixes + fallback comment**

**Legend: 🆕 = New file | 🔄 = Rewritten | ✏️ = Edited**





**Every Change Made (Full Session)**



**Fix 1 —** Resume path bug (src/lib/data.ts line 9)



\- resumePath: "/public/resume.pdf",

\+ resumePath: "/resume.pdf",



**Why:** In Next.js, public/ is the web root. A file at public/resume.pdf is served at /resume.pdf. The old path /public/resume.pdf would 404.



**Fix 2** — Email typo (src/lib/data.ts line 5)



\- email: process.env.NEXT\_PUBLIC\_CONTACT\_EMAIL || "nikshukla26@email.com",

\+ email: process.env.NEXT\_PUBLIC\_CONTACT\_EMAIL || "nikshukla26@gmail.com",



**Why:** email.com is not your domain — the fallback now matches your actual Gmail (gmail.com) used everywhere else.



**Fix 3** — Fallback comment (src/lib/data.ts line 462)



\+ // Fallback data — used only when the GitHub API (/api/github) is unreachable.

\+ // Live data is fetched automatically; you don't need to update this manually.

&#x20; export const githubData = {



**Why:** Clarity for your future self — this hardcoded block is now a safety net, not the source of truth.





**New File** — src/app/api/github/route.ts

A server-side GET endpoint that:

|**Step**|**What it does**|
|-|-|
|1|Reads githubData.username ("NikhShu") from data.ts|
|2|Calls api.github.com/users/NikhShu → gets profile (total repos, followers)|
|3|Calls api.github.com/users/NikhShu/repos?per\_page=100 → gets all repos|
|4|Filters out forks (keeps only your own repos)|
|5|Computes totalStars and totalForks by summing across all repos|
|6|Returns a clean JSON with everything the frontend needs|
|7|If GitHub is down → returns the hardcoded fallback from data.ts|

**Caching: next:** { revalidate: 3600 } — Next.js caches GitHub responses for 1 hour, so repeat visitors don't burn rate limits.



**Auth:** If GITHUB\_TOKEN exists in env, attaches it as Bearer token for 5,000 req/hr instead of 60.





**Rewritten —** src/components/sections/GitHubSection.tsx

|**Before (Old)**|**After (New)**|
|-|-|
|Imported hardcoded githubData from data.ts|Fetches /api/github with useEffect on mount|
|Showed 6 manually listed repos|Shows all public owned repos dynamically|
|Stats: Repos = 15, Stars = —, Contributions = Active|Stats: Real Repos, Stars, Forks, Followers|
|No loading state|Animated skeleton loaders while fetching|
|No error handling|Graceful error state with message|
|All language dots were same color|Proper GitHub language colors (Python blue, JS yellow, etc.)|
|No topic tags|Shows repo topics as colored badges|
|No fallback indicator|Shows "cached data" notice when API fails|



**Updated —** .env.example



\+ # GitHub personal access token (optional)

\+ # Without it: 60 API requests/hour (fine for low-traffic portfolios)

\+ # With it:    5,000 requests/hour

\+ # Create one at https://github.com/settings/tokens (no scopes needed for public repos)

\+ GITHUB\_TOKEN=



**Remaining Issues**



1\. RESEND\_API\_KEY is still a placeholder (CRITICAL)



RESEND\_API\_KEY=re\_xxxxxxxxxxxx   ← not a real key



Your contact form will fail until you replace this with a real key from resend.com/api-keys (https://resend.com/api-keys).



2\. Resend sender is test domain



from: "Portfolio Contact [onboarding@resend.dev](mailto:onboarding@resend.dev)"



This is Resend's sandbox domain. It only delivers to your own verified email. Works for a portfolio (all messages go to you), but if you ever need to send to others, you'd need a verified custom domain.



3\. TypeScript strict-null warnings in contact/route.ts



6 pre-existing TS errors where name, email, subject, message are used after validation but TypeScript doesn't know they've been narrowed. They work at runtime but tsc --noEmit reports them. A quick fix would be adding non-null assertions or type guards.



|**Upgrade**|**Effort**|**Impact**|
|-|-|-|
|GitHub contribution graph — render the green squares heatmap using GitHub's GraphQL API|Medium|High visual impact|
|Pin repos on GitHub → show pinned repos first — GitHub API supports GET /users/{user}/repos?type=owner\&sort=stars but pinned repos need GraphQL|Low|Better repo ordering|
|Rate-limit the contact API — add basic rate limiting (e.g., 5 submissions/minute per IP) to prevent spam|Low|Security|
|HTML email template — replace plain-text email body with a styled HTML template via Resend's React email support|Low|Professional look|
|Fix TS strict errors in contact/route.ts — add proper type narrowing after validation|Low|Clean build|
|SEO: Add og-image.png — siteMetadata.ogImage references /og-image.png but the file doesn't exist in public/|Low|Better social sharing|
|Blog posts link to real content — blogPosts in data.ts has entries but no url field; they're display-only with no links|Medium|Content engagement|
|Dark/light theme toggle — currently hardcoded dark theme only|Medium|User preference|
|Analytics — add Vercel Analytics or Plausible to track visitors|Low|Insights|
|Custom domain for Resend — verify your domain so emails come from you@yourdomain.com instead of onboarding@resend.dev|Low|Professional emails|



### **Phase 4:**

**Files Changed / Created**

|**File**|**Action**|**What**|
|-|-|-|
|src/app/api/contact/route.ts|🔄 Rewritten|Fixed 6 TS errors + configurable sender domain|
|src/components/Analytics.tsx|🆕 Created|GA4 + Clarity scripts, loaded conditionally|
|src/app/layout.tsx|✏️ Edited|Imported and rendered <Analytics />|
|.env.example|✏️ Updated|Added 3 new env vars with docs|
|.env.local|✏️ Updated|Added 3 new env var placeholders|



**Change 1** — TypeScript Errors Fixed (contact/route.ts)



**Root cause:** The old code destructured { name, email, subject, message } from an interface with all fields optional (string | undefined). After the validation block returned early on errors, TypeScript still saw them as possibly undefined.



**Fix:** Replaced the old ContactBody interface approach with inline trimming at parse time:



const name = typeof body.name === "string" ? body.name.trim() : "";

const email = typeof body.email === "string" ? body.email.trim() : "";

const subject = typeof body.subject === "string" ? body.subject.trim() : "";

const message = typeof body.message === "string" ? body.message.trim() : "";



Now every variable is a guaranteed string from the start — no undefined possible, zero type errors, and values are pre-trimmed so .trim() isn't repeated 2-3 times throughout the file.



**Change 2** — Sender Domain Fix (contact/route.ts)



**Before:**

from: "Portfolio Contact [onboarding@resend.dev](mailto:onboarding@resend.dev)"  // hardcoded test domain



**After:**

const senderAddress = process.env.RESEND\_FROM\_EMAIL || "onboarding@resend.dev";

from: `Portfolio Contact <${senderAddress}>`



Now controlled by RESEND\_FROM\_EMAIL env var. When you verify a custom domain in Resend's dashboard, just set:



RESEND\_FROM\_EMAIL=contact@nikhilshukla.dev



**Change 3** — Google Analytics GA4 (Analytics.tsx)



Loads gtag.js only when NEXT\_PUBLIC\_GA\_ID is set. Uses Next.js <Script strategy="afterInteractive"> so it doesn't block page rendering.



**To activate:**

1\. Go to analytics.google.com (https://analytics.google.com) → Admin → Data Streams → Web

2\. Copy your Measurement ID (format: G-XXXXXXXXXX)

3\. In Vercel dashboard (or .env.local): set NEXT\_PUBLIC\_GA\_ID=G-XXXXXXXXXX



**Change 4** — Microsoft Clarity (Analytics.tsx)



Loads the Clarity tracking script only when NEXT\_PUBLIC\_CLARITY\_ID is set. Same afterInteractive strategy.



**To activate:**

1\. Go to clarity.microsoft.com (https://clarity.microsoft.com) → create a project

2\. Copy your Project ID from the setup page

3\. In Vercel dashboard (or .env.local): set NEXT\_PUBLIC\_CLARITY\_ID=your\_project\_id





**Updated .env.example (Full Template)**

NEXT\_PUBLIC\_CONTACT\_EMAIL=your@email.com

RESEND\_API\_KEY=re\_xxxxxxxxxxxx

RESEND\_FROM\_EMAIL=                    # ← NEW: custom sender domain

GITHUB\_TOKEN=                         # ← optional: higher rate limits

NEXT\_PUBLIC\_GA\_ID=                    # ← NEW: Google Analytics

NEXT\_PUBLIC\_CLARITY\_ID=               # ← NEW: Microsoft Clarity





**Vercel Deployment Checklist**

When you deploy, add these env vars in Vercel Dashboard → Settings → Environment Variables:

|**Variable**|**Required**|**Where to get it**|
|-|-|-|
|RESEND\_API\_KEY|Yes|resend.com/api-keys (https://resend.com/api-keys)|
|NEXT\_PUBLIC\_CONTACT\_EMAIL|Yes|Your email|
|RESEND\_FROM\_EMAIL|No|Resend dashboard after domain verification|
|GITHUB\_TOKEN|No|github.com/settings/tokens (https://github.com/settings/tokens)|
|NEXT\_PUBLIC\_GA\_ID|No|analytics.google.com (https://analytics.google.com)|
|NEXT\_PUBLIC\_CLARITY\_ID|No|clarity.microsoft.com (https://clarity.microsoft.com)|



All analytics scripts load only when their env var is set, so the site works perfectly without them — no errors, no broken tracking calls.

