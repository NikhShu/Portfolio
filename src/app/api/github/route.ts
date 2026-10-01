import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";
const USERNAME = "NikhShu";

// Fallback data — used only when the GitHub API is unreachable.
// Live data is fetched automatically; you don't need to update this manually.
const FALLBACK_REPOS = [
  {
    name: "posture-based-curriculum-recommendation",
    description: "AI-driven posture analysis and curriculum optimization system (Patented)",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/posture-based-curriculum-recommendation",
  },
  {
    name: "Sitting_Posture_Recognition-",
    description: "OpenPose-inspired real-time 2D keypoint detection and posture classification",
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/Sitting_Posture_Recognition-",
  },
  {
    name: "e-Commerce",
    description: "Full-stack e-commerce web application",
    language: "HTML",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/e-Commerce",
  },
  {
    name: "Calculator",
    description: "Web-based calculator application",
    language: "HTML",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/Calculator",
  },
  {
    name: "Weather-App",
    description: "Real-time weather application with API integration",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/Weather-App",
  },
  {
    name: "My-Self",
    description: "Personal profile page",
    language: "HTML",
    stars: 0,
    forks: 0,
    url: "https://github.com/NikhShu/My-Self",
  },
];

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Optional: authenticated requests get 5000 req/hr instead of 60
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API error: user=${userRes.status} repos=${reposRes.status}`
      );
    }

    const user = await userRes.json();
    const repos: Array<Record<string, unknown>> = await reposRes.json();

    // Only include owned repos (not forks)
    const ownedRepos = repos.filter((r) => !r.fork);

    const totalStars = ownedRepos.reduce(
      (sum, r) => sum + ((r.stargazers_count as number) || 0),
      0
    );
    const totalForks = ownedRepos.reduce(
      (sum, r) => sum + ((r.forks_count as number) || 0),
      0
    );

    const formattedRepos = ownedRepos.map((r) => ({
      name: r.name as string,
      description: (r.description as string) || "",
      language: (r.language as string) || null,
      stars: (r.stargazers_count as number) || 0,
      forks: (r.forks_count as number) || 0,
      url: r.html_url as string,
      updatedAt: r.updated_at as string,
      topics: (r.topics as string[]) || [],
    }));

    return NextResponse.json({
      username: user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      totalRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      repos: formattedRepos,
    });
  } catch (error) {
    console.error("GitHub API fetch failed:", error);

    // Fallback to hardcoded data so the section never breaks
    return NextResponse.json(
      {
        username: USERNAME,
        totalRepos: FALLBACK_REPOS.length,
        totalStars: 0,
        totalForks: 0,
        followers: 0,
        repos: FALLBACK_REPOS.map((repo) => ({
          ...repo,
          updatedAt: "",
          topics: [],
        })),
        fallback: true,
      },
      { status: 200 }
    );
  }
}
