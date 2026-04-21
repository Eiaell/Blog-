/**
 * Live endpoint — transparencia radical del build.
 *
 * Devuelve:
 *   - Ultimos commits del repo (GitHub REST, sin auth — funciona con ratelimit publico bajo)
 *   - Stats basicas del repo (lenguajes, total commits approx, stars)
 *   - Metadata del build actual (timestamp de deploy, region Vercel)
 *
 * Cached 5 min (revalidate) — suficiente y evita saturar la API publica.
 */

export const revalidate = 300; // 5 min

const REPO_OWNER = 'Eiaell';
const REPO_NAME = 'Blog-';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
  author: { login: string; avatar_url: string } | null;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  size: number;
  default_branch: string;
}

interface GitHubLanguages {
  [lang: string]: number;
}

interface LiveCommit {
  sha: string;
  shortSha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  avatar: string | null;
}

interface LiveResponse {
  commits: LiveCommit[];
  repo: {
    stars: number;
    forks: number;
    issues: number;
    pushedAt: string;
    sizeKb: number;
  };
  languages: { name: string; bytes: number; pct: number }[];
  build: {
    region: string | null;
    deployedAt: string; // timestamp de respuesta (proxy a ultimo render/cache)
    commitSha: string | null;
  };
  meta: {
    fetchedAt: string;
    cachedFor: number; // segundos
  };
}

// ── GitHub fetch helpers ────────────────────────────────────────────────────
async function gh<T>(path: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    // Si hay token, uselo para ratelimit 5000/h en vez de 60/h
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`${API_BASE}${path}`, {
      headers,
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`[live] GitHub ${path} -> ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error('[live] fetch error', e);
    return null;
  }
}

// ── GET handler ─────────────────────────────────────────────────────────────
export async function GET() {
  const [commitsRaw, repo, languages] = await Promise.all([
    gh<GitHubCommit[]>('/commits?per_page=10'),
    gh<GitHubRepo>(''),
    gh<GitHubLanguages>('/languages'),
  ]);

  const commits: LiveCommit[] = (commitsRaw ?? []).map((c) => ({
    sha: c.sha,
    shortSha: c.sha.slice(0, 7),
    message: c.commit.message.split('\n')[0], // solo el titulo
    author: c.author?.login || c.commit.author.name,
    date: c.commit.author.date,
    url: c.html_url,
    avatar: c.author?.avatar_url ?? null,
  }));

  const langEntries = Object.entries(languages ?? {});
  const totalBytes = langEntries.reduce((acc, [, v]) => acc + v, 0);
  const langList = langEntries
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      bytes,
      pct: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }));

  const response: LiveResponse = {
    commits,
    repo: {
      stars: repo?.stargazers_count ?? 0,
      forks: repo?.forks_count ?? 0,
      issues: repo?.open_issues_count ?? 0,
      pushedAt: repo?.pushed_at ?? new Date().toISOString(),
      sizeKb: repo?.size ?? 0,
    },
    languages: langList,
    build: {
      region: process.env.VERCEL_REGION ?? null,
      deployedAt:
        process.env.VERCEL_DEPLOYMENT_ID
          ? new Date().toISOString()
          : new Date().toISOString(),
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    },
    meta: {
      fetchedAt: new Date().toISOString(),
      cachedFor: revalidate,
    },
  };

  return Response.json(response, {
    headers: {
      'cache-control': `public, s-maxage=${revalidate}, stale-while-revalidate=60`,
    },
  });
}

export type { LiveResponse, LiveCommit };
