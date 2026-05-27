"use client";

import { useEffect, useState } from "react";
import { listProjects } from "@/lib/api";
import type { Project } from "@/lib/schemas/project";

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

/**
 * Busca os projetos publicados na API (client-side). `initial` serve de fallback
 * para a primeira pintura (ex.: dados estáticos) enquanto a API responde — e é
 * mantido se a requisição falhar.
 */
export function useProjects(initial: Project[] = []): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>(initial);
  const [loading, setLoading] = useState(initial.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    listProjects()
      .then((data) => {
        if (!active) return;
        setProjects(data);
        setError(null);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : "Erro ao carregar projetos.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}
