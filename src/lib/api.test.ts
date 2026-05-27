import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  ApiError,
  createProject,
  getProject,
  listProjects,
  login,
  uploadImage,
  reorderProjects,
  reorderCertificates,
  reorderTestimonials,
  reorderMilestones,
  reorderSkillGroups,
  reorderServices,
  _resetCsrf,
} from "./api";

const row = {
  id: 1,
  slug: "casa-pronta",
  nome: "Casa Pronta",
  imagem: null,
  tecnologias: ["Next.js", "PHP"],
  link_linkedin: null,
  link_github: null,
  link_ver_projeto: null,
  descricao_pt: "Projeto real",
  descricao_en: "Real project",
  data_pt: null,
  data_en: null,
  ordem: 0,
  publicado: true,
};

function res(data: unknown, ok = true, status = 200) {
  return { ok, status, json: async () => data } as Response;
}

beforeEach(() => {
  _resetCsrf();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("listProjects", () => {
  it("valida e mapeia a lista para o domínio", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(res({ projects: [row] })));
    const projects = await listProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].descricao).toEqual({ pt: "Projeto real", en: "Real project" });
    expect(projects[0].imagem).toBeUndefined();
  });

  it("lança ApiError com a mensagem do servidor em erro HTTP", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(res({ error: "Falhou aqui." }, false, 500)));
    await expect(listProjects()).rejects.toMatchObject({ status: 500, message: "Falhou aqui." });
  });

  it("lança ApiError quando a resposta está fora do contrato", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(res({ projects: [{ id: "x" }] })));
    await expect(listProjects()).rejects.toBeInstanceOf(ApiError);
  });

  it("lança ApiError quando o fetch falha (rede)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    await expect(listProjects()).rejects.toMatchObject({ status: 0 });
  });
});

describe("getProject", () => {
  it("monta a URL com o slug codificado", async () => {
    const fetchMock = vi.fn().mockResolvedValue(res({ project: row }));
    vi.stubGlobal("fetch", fetchMock);
    await getProject("casa pronta");
    expect(fetchMock.mock.calls[0][0]).toContain("action=get&slug=casa%20pronta");
  });
});

describe("CSRF nas escritas", () => {
  it("envia o token recebido no login no header X-CSRF-Token", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(res({ user: { id: 1, username: "luiz" }, csrf: "TOK123" }))
      .mockResolvedValueOnce(res({ project: row }, true, 201));
    vi.stubGlobal("fetch", fetchMock);

    await login("luiz", "senha");
    await createProject({ nome: "Novo", tecnologias: [], links: {}, publicado: true });

    const createInit = fetchMock.mock.calls[1][1] as RequestInit;
    const headers = createInit.headers as Record<string, string>;
    expect(headers["X-CSRF-Token"]).toBe("TOK123");
  });
});

describe("reorder", () => {
  it("posta { ids } no endpoint action=reorder e aceita { ok: true }", async () => {
    const fetchMock = vi.fn().mockResolvedValue(res({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await reorderProjects([3, 1, 2]);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/projects.php?action=reorder");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ ids: [3, 1, 2] });
  });

  it("cada entidade chama o endpoint .php correspondente", async () => {
    const fetchMock = vi.fn().mockResolvedValue(res({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const cases: [() => Promise<void>, string][] = [
      [() => reorderProjects([1]), "projects.php"],
      [() => reorderCertificates([1]), "certificates.php"],
      [() => reorderTestimonials([1]), "testimonials.php"],
      [() => reorderMilestones([1]), "milestones.php"],
      [() => reorderSkillGroups([1]), "skills.php"],
      [() => reorderServices([1]), "services.php"],
    ];
    for (const [call, endpoint] of cases) {
      await call();
      const url = fetchMock.mock.calls.at(-1)![0] as string;
      expect(url).toContain(`/api/${endpoint}?action=reorder`);
    }
  });

  it("envia o token CSRF recebido no login", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(res({ user: { id: 1, username: "luiz" }, csrf: "TOK" }))
      .mockResolvedValueOnce(res({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await login("luiz", "senha");
    await reorderProjects([1, 2]);

    const init = fetchMock.mock.calls[1][1] as RequestInit;
    expect((init.headers as Record<string, string>)["X-CSRF-Token"]).toBe("TOK");
  });

  it("propaga ApiError quando o servidor recusa (ex.: 401 sem auth)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(res({ error: "Não autenticado." }, false, 401)));
    await expect(reorderProjects([1])).rejects.toMatchObject({ status: 401, message: "Não autenticado." });
  });
});

describe("uploadImage", () => {
  it("envia FormData com o token e retorna o caminho", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(res({ user: { id: 1, username: "luiz" }, csrf: "TOK" }))
      .mockResolvedValueOnce(res({ path: "/uploads/abc.webp" }, true, 201));
    vi.stubGlobal("fetch", fetchMock);

    await login("luiz", "senha");
    const path = await uploadImage(new File(["x"], "foto.webp", { type: "image/webp" }));

    expect(path).toBe("/uploads/abc.webp");
    const uploadInit = fetchMock.mock.calls[1][1] as RequestInit;
    expect(uploadInit.body).toBeInstanceOf(FormData);
    expect((uploadInit.headers as Record<string, string>)["X-CSRF-Token"]).toBe("TOK");
  });
});
