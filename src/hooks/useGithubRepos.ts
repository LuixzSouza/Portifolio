"use client";

import { useEffect, useState } from "react";

const GITHUB_USER = "LuixzSouza";

/** Repositório do GitHub já reduzido ao que os cards de trabalho usam. */
export interface GithubRepo {
  name: string;
  htmlUrl: string;
  homepage?: string;
  description?: string;
  techs: string[];
  updatedAt: string;
}

interface RawRepo {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

/**
 * TODOS os repos públicos de github.com/LuixzSouza (client-side, sem token — API
 * pública do GitHub, ~60 req/h por IP; per_page=100 cobre a conta). Sai vazio em
 * falha/limite, então o grid de trabalhos continua só com os projetos curados.
 * O limite de exibição (paginação) fica por conta da página de Trabalhos.
 */
export function useGithubRepos(): GithubRepo[] {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? (r.json() as Promise<RawRepo[]>) : Promise.reject()))
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        const mapped = data
          .filter((r) => !r.fork && !r.archived)
          .map<GithubRepo>((r) => ({
            name: r.name,
            htmlUrl: r.html_url,
            homepage: r.homepage?.trim() ? r.homepage.trim() : undefined,
            description: r.description ?? undefined,
            techs: Array.from(
              new Set([r.language, ...(r.topics ?? [])].filter((t): t is string => Boolean(t))),
            ).slice(0, 4),
            updatedAt: r.updated_at,
          }));
        setRepos(mapped);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return repos;
}
