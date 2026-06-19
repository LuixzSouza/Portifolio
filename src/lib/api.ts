import { z } from "zod";
import {
  apiProjectToProject,
  projectResponseSchema,
  projectsListResponseSchema,
  type Project,
  type ProjectInput,
} from "@/lib/schemas/project";
import {
  apiCertificateToCertificate,
  certificateResponseSchema,
  certificatesListResponseSchema,
  type Certificate,
  type CertificateInput,
} from "@/lib/schemas/certificate";
import {
  apiTestimonialToTestimonial,
  testimonialResponseSchema,
  testimonialsListResponseSchema,
  type Testimonial,
  type TestimonialInput,
} from "@/lib/schemas/testimonial";
import {
  apiMilestoneToMilestone,
  milestoneResponseSchema,
  milestonesListResponseSchema,
  type Milestone,
  type MilestoneInput,
} from "@/lib/schemas/milestone";
import {
  apiSkillGroupToSkillGroup,
  skillGroupResponseSchema,
  skillGroupsResponseSchema,
  type SkillGroup,
  type SkillGroupInput,
} from "@/lib/schemas/skill";
import {
  apiServiceToService,
  serviceResponseSchema,
  servicesListResponseSchema,
  type Service,
  type ServiceInput,
} from "@/lib/schemas/service";
import {
  contentItemResponseSchema,
  contentMapResponseSchema,
  type ContentInput,
  type ContentMap,
} from "@/lib/schemas/content";

/**
 * Cliente da API PHP (CMS). Em produção é mesma origem (`/php`); em dev aponte
 * NEXT_PUBLIC_API_BASE para o servidor PHP local (ex.: http://localhost:8000).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/php";

/**
 * Em dev não há PHP rodando (o backend vive na Hostinger), então toda chamada
 * batia 404 e poluía o console — os componentes já caem no fallback estático.
 * Desabilita a rede SÓ em desenvolvimento; se um backend for apontado
 * explicitamente (NEXT_PUBLIC_API_BASE, ex.: PHP local p/ testar o /admin),
 * reabilita. Em produção e em teste (fetch mockado) fica sempre habilitado.
 */
const API_ENABLED =
  process.env.NODE_ENV !== "development" || process.env.NEXT_PUBLIC_API_BASE != null;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Token CSRF recebido no login/me; enviado nas escritas via header X-CSRF-Token.
let csrfToken: string | null = null;

/** Apenas para testes: reseta o token CSRF em memória. */
export function _resetCsrf(): void {
  csrfToken = null;
}

async function request<T>(path: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  // Sem backend configurado em dev: nem tenta a rede (evita 404 no console). O
  // chamador trata como falha e mantém o conteúdo estático.
  if (!API_ENABLED) {
    throw new ApiError(0, "API desabilitada (sem backend configurado em dev).");
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...init });
  } catch {
    throw new ApiError(0, "Não foi possível conectar à API.");
  }

  const json: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      json && typeof json === "object" && "error" in json
        ? String((json as { error: unknown }).error)
        : `Erro ${res.status}.`;
    throw new ApiError(res.status, message);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new ApiError(res.status, "Resposta da API em formato inesperado.");
  }
  return parsed.data;
}

function jsonInit(body: unknown): RequestInit {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
    },
    body: JSON.stringify(body),
  };
}

/** Resposta padrão de escritas sem retorno (delete/reorder/logout). */
const okSchema = z.object({ ok: z.boolean() });

// ---------------------------------------------------------------------------
// Público (site)
// ---------------------------------------------------------------------------

export async function listProjects(): Promise<Project[]> {
  const data = await request("/api/projects.php?action=list", projectsListResponseSchema);
  return data.projects.map(apiProjectToProject);
}

export async function getProject(slug: string): Promise<Project> {
  const data = await request(
    `/api/projects.php?action=get&slug=${encodeURIComponent(slug)}`,
    projectResponseSchema,
  );
  return apiProjectToProject(data.project);
}

// ---------------------------------------------------------------------------
// Autenticação (painel)
// ---------------------------------------------------------------------------

export interface AdminUser {
  id: number;
  username: string;
}

const userSchema = z.object({ id: z.number(), username: z.string() });
const loginResponseSchema = z.object({ user: userSchema, csrf: z.string() });
const meResponseSchema = z.object({ user: userSchema.nullable(), csrf: z.string().optional() });

export async function login(username: string, password: string): Promise<AdminUser> {
  const data = await request("/api/auth.php?action=login", loginResponseSchema, jsonInit({ username, password }));
  csrfToken = data.csrf;
  return data.user;
}

export async function me(): Promise<AdminUser | null> {
  const data = await request("/api/auth.php?action=me", meResponseSchema);
  if (data.csrf) csrfToken = data.csrf;
  return data.user;
}

export async function logout(): Promise<void> {
  await request("/api/auth.php?action=logout", okSchema, jsonInit({}));
  csrfToken = null;
}

// ---------------------------------------------------------------------------
// Projetos (admin)
// ---------------------------------------------------------------------------

export async function listAllProjects(): Promise<Project[]> {
  const data = await request("/api/projects.php?action=all", projectsListResponseSchema);
  return data.projects.map(apiProjectToProject);
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const data = await request("/api/projects.php?action=create", projectResponseSchema, jsonInit(input));
  return apiProjectToProject(data.project);
}

export async function updateProject(id: number, input: ProjectInput): Promise<Project> {
  const data = await request("/api/projects.php?action=update", projectResponseSchema, jsonInit({ id, ...input }));
  return apiProjectToProject(data.project);
}

export async function deleteProject(id: number): Promise<void> {
  await request("/api/projects.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderProjects(ids: number[]): Promise<void> {
  await request("/api/projects.php?action=reorder", okSchema, jsonInit({ ids }));
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const data = await request("/api/upload.php", z.object({ path: z.string() }), {
    method: "POST",
    headers: { ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}) },
    body: form,
  });
  return data.path;
}

// ---------------------------------------------------------------------------
// Certificados
// ---------------------------------------------------------------------------

export async function listCertificates(): Promise<Certificate[]> {
  const data = await request("/api/certificates.php?action=list", certificatesListResponseSchema);
  return data.certificates.map(apiCertificateToCertificate);
}

export async function getCertificate(slug: string): Promise<Certificate> {
  const data = await request(
    `/api/certificates.php?action=get&slug=${encodeURIComponent(slug)}`,
    certificateResponseSchema,
  );
  return apiCertificateToCertificate(data.certificate);
}

export async function listAllCertificates(): Promise<Certificate[]> {
  const data = await request("/api/certificates.php?action=all", certificatesListResponseSchema);
  return data.certificates.map(apiCertificateToCertificate);
}

export async function createCertificate(input: CertificateInput): Promise<Certificate> {
  const data = await request("/api/certificates.php?action=create", certificateResponseSchema, jsonInit(input));
  return apiCertificateToCertificate(data.certificate);
}

export async function updateCertificate(id: number, input: CertificateInput): Promise<Certificate> {
  const data = await request("/api/certificates.php?action=update", certificateResponseSchema, jsonInit({ id, ...input }));
  return apiCertificateToCertificate(data.certificate);
}

export async function deleteCertificate(id: number): Promise<void> {
  await request("/api/certificates.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderCertificates(ids: number[]): Promise<void> {
  await request("/api/certificates.php?action=reorder", okSchema, jsonInit({ ids }));
}

// ---------------------------------------------------------------------------
// Depoimentos
// ---------------------------------------------------------------------------

export async function listTestimonials(): Promise<Testimonial[]> {
  const data = await request("/api/testimonials.php?action=list", testimonialsListResponseSchema);
  return data.testimonials.map(apiTestimonialToTestimonial);
}

export async function listAllTestimonials(): Promise<Testimonial[]> {
  const data = await request("/api/testimonials.php?action=all", testimonialsListResponseSchema);
  return data.testimonials.map(apiTestimonialToTestimonial);
}

export async function createTestimonial(input: TestimonialInput): Promise<Testimonial> {
  const data = await request("/api/testimonials.php?action=create", testimonialResponseSchema, jsonInit(input));
  return apiTestimonialToTestimonial(data.testimonial);
}

export async function updateTestimonial(id: number, input: TestimonialInput): Promise<Testimonial> {
  const data = await request("/api/testimonials.php?action=update", testimonialResponseSchema, jsonInit({ id, ...input }));
  return apiTestimonialToTestimonial(data.testimonial);
}

export async function deleteTestimonial(id: number): Promise<void> {
  await request("/api/testimonials.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderTestimonials(ids: number[]): Promise<void> {
  await request("/api/testimonials.php?action=reorder", okSchema, jsonInit({ ids }));
}

// ---------------------------------------------------------------------------
// Timeline (marcos)
// ---------------------------------------------------------------------------

export async function listMilestones(): Promise<Milestone[]> {
  const data = await request("/api/milestones.php?action=list", milestonesListResponseSchema);
  return data.milestones.map(apiMilestoneToMilestone);
}

export async function listAllMilestones(): Promise<Milestone[]> {
  const data = await request("/api/milestones.php?action=all", milestonesListResponseSchema);
  return data.milestones.map(apiMilestoneToMilestone);
}

export async function createMilestone(input: MilestoneInput): Promise<Milestone> {
  const data = await request("/api/milestones.php?action=create", milestoneResponseSchema, jsonInit(input));
  return apiMilestoneToMilestone(data.milestone);
}

export async function updateMilestone(id: number, input: MilestoneInput): Promise<Milestone> {
  const data = await request("/api/milestones.php?action=update", milestoneResponseSchema, jsonInit({ id, ...input }));
  return apiMilestoneToMilestone(data.milestone);
}

export async function deleteMilestone(id: number): Promise<void> {
  await request("/api/milestones.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderMilestones(ids: number[]): Promise<void> {
  await request("/api/milestones.php?action=reorder", okSchema, jsonInit({ ids }));
}

// ---------------------------------------------------------------------------
// Skills (grupos)
// ---------------------------------------------------------------------------

export async function listSkillGroups(): Promise<SkillGroup[]> {
  const data = await request("/api/skills.php?action=list", skillGroupsResponseSchema);
  return data.skillGroups.map(apiSkillGroupToSkillGroup);
}

export async function createSkillGroup(input: SkillGroupInput): Promise<SkillGroup> {
  const data = await request("/api/skills.php?action=create", skillGroupResponseSchema, jsonInit(input));
  return apiSkillGroupToSkillGroup(data.skillGroup);
}

export async function updateSkillGroup(id: number, input: SkillGroupInput): Promise<SkillGroup> {
  const data = await request("/api/skills.php?action=update", skillGroupResponseSchema, jsonInit({ id, ...input }));
  return apiSkillGroupToSkillGroup(data.skillGroup);
}

export async function deleteSkillGroup(id: number): Promise<void> {
  await request("/api/skills.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderSkillGroups(ids: number[]): Promise<void> {
  await request("/api/skills.php?action=reorder", okSchema, jsonInit({ ids }));
}

// ---------------------------------------------------------------------------
// Serviços
// ---------------------------------------------------------------------------

export async function listServices(): Promise<Service[]> {
  const data = await request("/api/services.php?action=list", servicesListResponseSchema);
  return data.services.map(apiServiceToService);
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const data = await request(
    `/api/services.php?action=get&slug=${encodeURIComponent(slug)}`,
    serviceResponseSchema,
  );
  return apiServiceToService(data.service);
}

export async function listAllServices(): Promise<Service[]> {
  const data = await request("/api/services.php?action=all", servicesListResponseSchema);
  return data.services.map(apiServiceToService);
}

export async function createService(input: ServiceInput): Promise<Service> {
  const data = await request("/api/services.php?action=create", serviceResponseSchema, jsonInit(input));
  return apiServiceToService(data.service);
}

export async function updateService(id: number, input: ServiceInput): Promise<Service> {
  const data = await request("/api/services.php?action=update", serviceResponseSchema, jsonInit({ id, ...input }));
  return apiServiceToService(data.service);
}

export async function deleteService(id: number): Promise<void> {
  await request("/api/services.php?action=delete", okSchema, jsonInit({ id }));
}

export async function reorderServices(ids: number[]): Promise<void> {
  await request("/api/services.php?action=reorder", okSchema, jsonInit({ ids }));
}

// ---------------------------------------------------------------------------
// Textos de seção (content)
// ---------------------------------------------------------------------------

export async function getContent(): Promise<ContentMap> {
  const data = await request("/api/content.php?action=list", contentMapResponseSchema);
  return data.content;
}

export async function setContent(input: ContentInput): Promise<void> {
  await request("/api/content.php?action=set", contentItemResponseSchema, jsonInit(input));
}

export async function deleteContent(chave: string): Promise<void> {
  await request("/api/content.php?action=delete", okSchema, jsonInit({ chave }));
}
