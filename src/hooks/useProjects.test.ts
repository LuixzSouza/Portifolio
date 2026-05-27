import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProjects } from "./useProjects";
import * as api from "@/lib/api";
import type { Project } from "@/lib/schemas/project";

vi.mock("@/lib/api", () => ({
  listProjects: vi.fn(),
}));

const sample: Project = {
  id: 1,
  slug: "p",
  nome: "P",
  tecnologias: [],
  links: {},
  ordem: 0,
  publicado: true,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useProjects", () => {
  it("carrega os projetos da API e desliga o loading", async () => {
    vi.mocked(api.listProjects).mockResolvedValue([sample]);
    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.projects).toEqual([sample]);
    expect(result.current.error).toBeNull();
  });

  it("mantém o fallback inicial e expõe a mensagem de erro quando a API falha", async () => {
    vi.mocked(api.listProjects).mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useProjects([sample]));

    await waitFor(() => expect(result.current.error).toBe("boom"));
    expect(result.current.projects).toEqual([sample]);
  });
});
