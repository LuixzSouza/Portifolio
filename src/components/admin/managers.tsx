"use client";

import {
  listAllProjects, createProject, updateProject, deleteProject, reorderProjects,
  listAllCertificates, createCertificate, updateCertificate, deleteCertificate, reorderCertificates,
  listAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials,
  listAllMilestones, createMilestone, updateMilestone, deleteMilestone, reorderMilestones,
  listSkillGroups, createSkillGroup, updateSkillGroup, deleteSkillGroup, reorderSkillGroups,
  listAllServices, createService, updateService, deleteService, reorderServices,
} from "@/lib/api";
import type { Project, ProjectInput } from "@/lib/schemas/project";
import type { Certificate, CertificateInput } from "@/lib/schemas/certificate";
import type { Testimonial, TestimonialInput } from "@/lib/schemas/testimonial";
import type { Milestone, MilestoneInput } from "@/lib/schemas/milestone";
import type { SkillGroup, SkillGroupInput } from "@/lib/schemas/skill";
import type { Service, ServiceInput } from "@/lib/schemas/service";
import { EntityManager } from "./EntityManager";
import { Bilingual, Checkbox, Field, ImageField, Select, TagsInput, TextInput } from "./fields";
import { pair } from "./utils";
import type { PreviewData } from "./PreviewCard";
import { Plus, Trash2 } from "lucide-react";

// --- Projetos ---
export function ProjectsManager() {
  return (
    <EntityManager<Project, ProjectInput>
      title="Projetos"
      fetchAll={listAllProjects}
      create={createProject}
      update={updateProject}
      remove={deleteProject}
      reorder={reorderProjects}
      getId={(p) => p.id}
      rowTitle={(p) => p.nome}
      rowSubtitle={(p) => p.tecnologias.join(", ")}
      isPublished={(p) => p.publicado}
      previewType="project"
      emptyInput={{
        nome: "", imagem: "", tecnologias: [],
        links: { linkedin: "", github: "", verProjeto: "" },
        descricao: { pt: "", en: "" }, data: { pt: "", en: "" }, publicado: true,
      }}
      toInput={(p) => ({
        nome: p.nome,
        imagem: p.imagem ?? "",
        tecnologias: p.tecnologias,
        links: {
          linkedin: p.links.linkedin ?? "",
          github: p.links.github ?? "",
          verProjeto: p.links.verProjeto ?? "",
        },
        descricao: pair(p.descricao),
        data: pair(p.data),
        publicado: p.publicado,
      })}
      toPreview={(p): PreviewData => ({
        title: p.nome,
        subtitle: p.tecnologias.join(", "),
        description: typeof p.descricao === "string" ? p.descricao : p.descricao?.pt || p.descricao?.en || "",
        image: p.imagem,
        published: p.publicado,
        url: p.links.verProjeto,
        tags: p.tecnologias,
        date: typeof p.data === "string" ? p.data : p.data?.pt || p.data?.en || "",
      })}
      renderForm={(input, set) => (
        <>
          <Field label="Nome do projeto">
            <TextInput
              value={input.nome}
              onChange={(nome) => set({ nome })}
              placeholder="Ex: Casa Pronta, Portfolio Pessoal..."
            />
          </Field>

          <ImageField
            label="Imagem do projeto"
            value={input.imagem ?? ""}
            onChange={(imagem) => set({ imagem })}
            helpText="Imagem principal que representa o projeto (recomendado: 1200x800px)"
          />

          <TagsInput
            label="Tecnologias utilizadas"
            value={input.tecnologias}
            onChange={(tecnologias) => set({ tecnologias })}
            placeholder="React, TypeScript, Node.js..."
          />

          <Bilingual
            label="Descrição"
            value={input.descricao ?? { pt: "", en: "" }}
            onChange={(descricao) => set({ descricao })}
            multiline
            placeholder={{
              pt: "Descreva o projeto, seus objetivos e características...",
              en: "Describe the project, its goals and features..."
            }}
          />

          <Bilingual
            label="Data/Período"
            value={input.data ?? { pt: "", en: "" }}
            onChange={(data) => set({ data })}
            placeholder={{
              pt: "Ex: Janeiro 2024, 2023-2024, Em desenvolvimento...",
              en: "Ex: January 2024, 2023-2024, In development..."
            }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="LinkedIn (post sobre o projeto)">
              <TextInput
                value={input.links.linkedin ?? ""}
                onChange={(v) => set({ links: { ...input.links, linkedin: v } })}
                placeholder="https://linkedin.com/posts/..."
              />
            </Field>

            <Field label="GitHub (repositório)">
              <TextInput
                value={input.links.github ?? ""}
                onChange={(v) => set({ links: { ...input.links, github: v } })}
                placeholder="https://github.com/usuario/projeto"
              />
            </Field>
          </div>

          <Field label="URL do projeto (para visualização)">
            <TextInput
              value={input.links.verProjeto ?? ""}
              onChange={(v) => set({ links: { ...input.links, verProjeto: v } })}
              placeholder="https://meusite.com.br"
            />
          </Field>

          <Checkbox
            label="Projeto publicado"
            checked={input.publicado}
            onChange={(publicado) => set({ publicado })}
            helpText="Projetos publicados aparecerão no portfólio público"
          />
        </>
      )}
    />
  );
}

// --- Certificados ---
export function CertificatesManager() {
  return (
    <EntityManager<Certificate, CertificateInput>
      title="Certificados"
      fetchAll={listAllCertificates}
      create={createCertificate}
      update={updateCertificate}
      remove={deleteCertificate}
      reorder={reorderCertificates}
      getId={(c) => c.id}
      rowTitle={(c) => c.course}
      rowSubtitle={(c) => c.issuer}
      isPublished={(c) => c.publicado}
      previewType="certificate"
      emptyInput={{
        course: "", issuer: "", date: "", file: "", image: "",
        descricao: { pt: "", en: "" }, skills: [], publicado: true,
      }}
      toInput={(c) => ({
        course: c.course,
        issuer: c.issuer,
        date: c.date ?? "",
        file: c.file ?? "",
        image: c.image ?? "",
        descricao: pair(c.description),
        skills: c.skills,
        publicado: c.publicado,
      })}
      toPreview={(c): PreviewData => ({
        title: c.course,
        subtitle: c.issuer,
        description: typeof c.description === "string" ? c.description : c.description?.pt || c.description?.en || "",
        image: c.image,
        published: c.publicado,
        tags: c.skills,
        date: c.date,
      })}
      renderForm={(input, set) => (
        <>
          <Field label="Nome do curso/certificação">
            <TextInput
              value={input.course}
              onChange={(course) => set({ course })}
              placeholder="Ex: AWS Academy Cloud Foundations, React Developer..."
            />
          </Field>

          <Field label="Instituição emissora">
            <TextInput
              value={input.issuer ?? ""}
              onChange={(issuer) => set({ issuer })}
              placeholder="Ex: AWS Academy, Rocketseat, Udemy..."
            />
          </Field>

          <Field label="Data de conclusão">
            <TextInput
              value={input.date ?? ""}
              onChange={(date) => set({ date })}
              placeholder="Ex: Janeiro 2024, 15/03/2024..."
            />
          </Field>

          <ImageField
            label="Imagem do certificado"
            value={input.image ?? ""}
            onChange={(image) => set({ image })}
            helpText="Imagem ou screenshot do certificado"
          />

          <Field label="Arquivo PDF (opcional)">
            <TextInput
              value={input.file ?? ""}
              onChange={(file) => set({ file })}
              placeholder="caminho/para/certificado.pdf ou URL"
            />
          </Field>

          <Bilingual
            label="Descrição"
            value={input.descricao ?? { pt: "", en: "" }}
            onChange={(descricao) => set({ descricao })}
            multiline
            placeholder={{
              pt: "Descreva o que aprendeu, duração do curso, principais tópicos...",
              en: "Describe what you learned, course duration, main topics..."
            }}
          />

          <TagsInput
            label="Habilidades aprendidas"
            value={input.skills}
            onChange={(skills) => set({ skills })}
            placeholder="React, AWS, Cloud Computing, JavaScript..."
          />

          <Checkbox
            label="Certificado publicado"
            checked={input.publicado}
            onChange={(publicado) => set({ publicado })}
            helpText="Certificados publicados aparecerão na seção de certificações"
          />
        </>
      )}
    />
  );
}

// --- Depoimentos ---
export function TestimonialsManager() {
  return (
    <EntityManager<Testimonial, TestimonialInput>
      title="Depoimentos"
      fetchAll={listAllTestimonials}
      create={createTestimonial}
      update={updateTestimonial}
      remove={deleteTestimonial}
      reorder={reorderTestimonials}
      getId={(t) => t.id}
      rowTitle={(t) => t.name}
      rowSubtitle={(t) => typeof t.role === "string" ? t.role : t.role?.pt || t.role?.en || ""}
      isPublished={(t) => t.publicado}
      previewType="testimonial"
      emptyInput={{
        name: "", role: { pt: "", en: "" }, image: "",
        quote: { pt: "", en: "" }, publicado: true,
      }}
      toInput={(t) => ({
        name: t.name,
        role: pair(t.role),
        image: t.image ?? "",
        quote: pair(t.quote),
        publicado: t.publicado,
      })}
      toPreview={(t): PreviewData => ({
        title: t.name,
        subtitle: typeof t.role === "string" ? t.role : t.role?.pt || t.role?.en || "",
        description: typeof t.quote === "string" ? t.quote : t.quote?.pt || t.quote?.en || "",
        image: t.image,
        published: t.publicado,
        tags: ["depoimento"],
      })}
      renderForm={(input, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome da pessoa">
              <TextInput
                value={input.name}
                onChange={(name) => set({ name })}
                placeholder="Ex: João Silva, Maria Santos..."
              />
            </Field>

            <Bilingual
              label="Cargo/Função"
              value={input.role ?? { pt: "", en: "" }}
              onChange={(role) => set({ role })}
              placeholder={{
                pt: "Ex: CEO da Empresa X, Gerente de TI...",
                en: "Ex: Company X CEO, IT Manager..."
              }}
            />
          </div>

          <ImageField
            label="Foto da pessoa"
            value={input.image ?? ""}
            onChange={(image) => set({ image })}
            helpText="Foto da pessoa que deu o depoimento (opcional)"
          />

          <Bilingual
            label="Depoimento"
            value={input.quote ?? { pt: "", en: "" }}
            onChange={(quote) => set({ quote })}
            multiline
            placeholder={{
              pt: "Escreva o depoimento em português...",
              en: "Write the testimonial in English..."
            }}
          />


          <Checkbox
            label="Depoimento publicado"
            checked={input.publicado}
            onChange={(publicado) => set({ publicado })}
            helpText="Depoimentos publicados aparecerão na seção de feedback"
          />
        </>
      )}
    />
  );
}

// --- Trajetória ---
export function MilestonesManager() {
  return (
    <EntityManager<Milestone, MilestoneInput>
      title="Trajetória"
      fetchAll={listAllMilestones}
      create={createMilestone}
      update={updateMilestone}
      remove={deleteMilestone}
      reorder={reorderMilestones}
      getId={(m) => m.id}
      rowTitle={(m) => pair(m.year).pt || "(sem ano)"}
      rowSubtitle={(m) => pair(m.title).pt}
      isPublished={(m) => m.publicado}
      previewType="generic"
      emptyInput={{
        year: { pt: "", en: "" },
        title: { pt: "", en: "" },
        desc: { pt: "", en: "" },
        techs: [],
        publicado: true,
      }}
      toInput={(m) => ({
        year: pair(m.year),
        title: pair(m.title),
        desc: pair(m.desc),
        techs: m.techs,
        publicado: m.publicado,
      })}
      toPreview={(m): PreviewData => ({
        title: typeof m.title === "string" ? m.title : m.title?.pt || m.title?.en || "Sem título",
        subtitle: typeof m.year === "string" ? m.year : m.year?.pt || m.year?.en || "",
        description: typeof m.desc === "string" ? m.desc : m.desc?.pt || m.desc?.en || "",
        published: m.publicado,
        tags: ["timeline", ...m.techs],
        date: typeof m.year === "string" ? m.year : m.year?.pt || m.year?.en || "",
      })}
      renderForm={(input, set) => (
        <>
          <Bilingual
            label="Ano / marco"
            value={input.year}
            onChange={(year) => set({ year })}
            placeholder={{
              pt: "Ex: 2020, 2020-2021, Presente...",
              en: "Ex: 2020, 2020-2021, Present..."
            }}
          />

          <Bilingual
            label="Título / evento"
            value={input.title ?? { pt: "", en: "" }}
            onChange={(title) => set({ title })}
            placeholder={{
              pt: "Ex: Primeiro emprego, Formatura...",
              en: "Ex: First job, Graduation..."
            }}
          />

          <Bilingual
            label="Descrição"
            value={input.desc ?? { pt: "", en: "" }}
            onChange={(desc) => set({ desc })}
            multiline
            placeholder={{
              pt: "Conte mais sobre este momento da sua trajetória...",
              en: "Tell more about this moment in your journey..."
            }}
          />

          <TagsInput
            label="Tecnologias / habilidades"
            value={input.techs}
            onChange={(techs) => set({ techs })}
            placeholder="React, JavaScript, Design..."
          />

          <Checkbox
            label="Marco publicado"
            checked={input.publicado}
            onChange={(publicado) => set({ publicado })}
            helpText="Marcos publicados aparecerão na timeline do site"
          />
        </>
      )}
    />
  );
}

// --- Skills ---
export function SkillsManager() {
  return (
    <EntityManager<SkillGroup, SkillGroupInput>
      title="Skills"
      fetchAll={listSkillGroups}
      create={createSkillGroup}
      update={updateSkillGroup}
      remove={deleteSkillGroup}
      reorder={reorderSkillGroups}
      getId={(g) => g.id}
      rowTitle={(g) => pair(g.category).pt || "(sem categoria)"}
      rowSubtitle={(g) => g.skills.map((s) => `${s.name} (${s.level}/5)`).join(", ")}
      previewType="generic"
      emptyInput={{
        category: { pt: "", en: "" },
        skills: [{ name: "", level: 3 }]
      }}
      toInput={(g) => ({
        category: pair(g.category),
        skills: g.skills.map((s) => ({ name: s.name, level: s.level })),
      })}
      toPreview={(g): PreviewData => ({
        title: typeof g.category === "string" ? g.category : g.category?.pt || g.category?.en || "Skills",
        subtitle: `${g.skills.length} habilidades`,
        description: g.skills
          .slice(0, 3)
          .map(s => `${s.name} (${"★".repeat(s.level)}${"☆".repeat(5 - s.level)})`)
          .join(" • "),
        published: true,
        tags: ["skills", ...g.skills.map(s => s.name)],
      })}
      renderForm={(input, set) => {
        const skills = input.skills;
        const updateSkill = (i: number, patch: Partial<(typeof skills)[number]>) =>
          set({ skills: skills.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });

        return (
          <>
            <Bilingual
              label="Categoria das skills"
              value={input.category}
              onChange={(category) => set({ category })}
              placeholder={{
                pt: "Ex: Frontend, Backend, Design...",
                en: "Ex: Frontend, Backend, Design..."
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold uppercase tracking-widest text-muted">
                  Skills (nível 1–5)
                </label>
                <button
                  type="button"
                  onClick={() => set({ skills: [...skills, { name: "", level: 3 }] })}
                  className="flex items-center gap-2 rounded-xl border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <Plus className="h-3 w-3" /> Adicionar skill
                </button>
              </div>

              <div className="space-y-3">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-surface p-3">
                    <div className="flex-1">
                      <TextInput
                        value={s.name}
                        onChange={(name) => updateSkill(i, { name })}
                        placeholder="Nome da skill"
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={s.level}
                        onChange={(level) => updateSkill(i, { level })}
                        options={[
                          { value: 1, label: "1 - Básico" },
                          { value: 2, label: "2 - Iniciante" },
                          { value: 3, label: "3 - Intermediário" },
                          { value: 4, label: "4 - Avançado" },
                          { value: 5, label: "5 - Expert" },
                        ]}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => set({ skills: skills.filter((_, idx) => idx !== i) })}
                      className="rounded-lg p-2 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                      aria-label="Remover skill"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {skills.length === 0 && (
                <div className="text-center py-6 text-muted">
                  <p className="text-sm">Nenhuma skill adicionada ainda.</p>
                  <button
                    type="button"
                    onClick={() => set({ skills: [{ name: "", level: 3 }] })}
                    className="mt-2 text-sm text-foreground hover:underline"
                  >
                    Adicionar a primeira skill
                  </button>
                </div>
              )}
            </div>
          </>
        );
      }}
    />
  );
}

// --- Serviços ---
export function ServicesManager() {
  return (
    <EntityManager<Service, ServiceInput>
      title="Serviços"
      fetchAll={listAllServices}
      create={createService}
      update={updateService}
      remove={deleteService}
      reorder={reorderServices}
      getId={(s) => s.id}
      rowTitle={(s) => pair(s.title).pt || s.slug}
      rowSubtitle={(s) => `/${s.slug} • ${s.tags.join(", ")}`}
      isPublished={(s) => s.publicado}
      previewType="service"
      emptyInput={{
        n: "", image: "", accent: "#6366f1",
        title: { pt: "", en: "" },
        tagline: { pt: "", en: "" },
        intro: { pt: "", en: "" },
        forWho: { pt: "", en: "" },
        process: [],
        includes: [],
        tags: [],
        metaTitle: { pt: "", en: "" },
        metaDescription: { pt: "", en: "" },
        publicado: true,
      }}
      toInput={(s) => ({
        n: s.n ?? "",
        image: s.image ?? "",
        accent: s.accent ?? "#6366f1",
        title: pair(s.title),
        tagline: pair(s.tagline),
        intro: pair(s.intro),
        forWho: pair(s.forWho),
        process: s.process.map((p) => ({ title: pair(p.title), desc: pair(p.desc) })),
        includes: s.includes.map((it) => pair(it)),
        tags: s.tags,
        metaTitle: pair(s.metaTitle),
        metaDescription: pair(s.metaDescription),
        publicado: s.publicado,
      })}
      toPreview={(s): PreviewData => ({
        title: typeof s.title === "string" ? s.title : s.title?.pt || s.title?.en || "Serviço",
        subtitle: typeof s.tagline === "string" ? s.tagline : s.tagline?.pt || s.tagline?.en || "",
        description: typeof s.intro === "string" ? s.intro : s.intro?.pt || s.intro?.en || "",
        image: s.image,
        published: s.publicado,
        tags: s.tags,
        url: `/services/${s.slug}`,
      })}
      renderForm={(input, set) => {
        const process = input.process;
        const includes = input.includes;

        return (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Número (ex.: 01)">
                <TextInput
                  value={input.n ?? ""}
                  onChange={(n) => set({ n })}
                  placeholder="01"
                />
              </Field>
              <Field label="Cor de destaque">
                <TextInput
                  value={input.accent ?? ""}
                  onChange={(accent) => set({ accent })}
                  placeholder="#6366f1"
                />
              </Field>
            </div>

            <ImageField
              label="Imagem do serviço"
              value={input.image ?? ""}
              onChange={(image) => set({ image })}
              helpText="Imagem representativa do serviço"
            />

            <Bilingual
              label="Título do serviço"
              value={input.title}
              onChange={(title) => set({ title })}
              placeholder={{
                pt: "Ex: Criação de Sites",
                en: "Ex: Website Creation"
              }}
            />

            <Bilingual
              label="Tagline / slogan"
              value={input.tagline ?? { pt: "", en: "" }}
              onChange={(tagline) => set({ tagline })}
              placeholder={{
                pt: "Ex: Sites profissionais que convertem",
                en: "Ex: Professional websites that convert"
              }}
            />

            <Bilingual
              label="Introdução"
              value={input.intro ?? { pt: "", en: "" }}
              onChange={(intro) => set({ intro })}
              multiline
              placeholder={{
                pt: "Descreva o serviço e seus benefícios...",
                en: "Describe the service and its benefits..."
              }}
            />

            <Bilingual
              label="Para quem é este serviço"
              value={input.forWho ?? { pt: "", en: "" }}
              onChange={(forWho) => set({ forWho })}
              multiline
              placeholder={{
                pt: "Ex: Ideal para empresas que querem...",
                en: "Ex: Ideal for companies that want..."
              }}
            />

            {/* Processo */}
            <div className="space-y-4 rounded-2xl border border-foreground/10 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted">
                  Processo (etapas do trabalho)
                </h4>
                <button
                  type="button"
                  onClick={() => set({
                    process: [...process, { title: { pt: "", en: "" }, desc: { pt: "", en: "" } }]
                  })}
                  className="flex items-center gap-2 rounded-xl border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <Plus className="h-3 w-3" /> Adicionar etapa
                </button>
              </div>

              <div className="space-y-4">
                {process.map((step, i) => (
                  <div key={i} className="rounded-xl border border-foreground/10 bg-surface p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted">Etapa {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => set({ process: process.filter((_, idx) => idx !== i) })}
                        className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                        aria-label="Remover etapa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Bilingual
                      label="Título da etapa"
                      value={step.title}
                      onChange={(title) => set({ process: process.map((p, idx) => (idx === i ? { ...p, title } : p)) })}
                      placeholder={{
                        pt: "Ex: Análise e planejamento",
                        en: "Ex: Analysis and planning"
                      }}
                    />
                    <Bilingual
                      label="Descrição da etapa"
                      value={step.desc}
                      onChange={(desc) => set({ process: process.map((p, idx) => (idx === i ? { ...p, desc } : p)) })}
                      multiline
                      placeholder={{
                        pt: "O que acontece nesta etapa...",
                        en: "What happens in this step..."
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* O que inclui */}
            <div className="space-y-4 rounded-2xl border border-foreground/10 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted">
                  O que inclui
                </h4>
                <button
                  type="button"
                  onClick={() => set({ includes: [...includes, { pt: "", en: "" }] })}
                  className="flex items-center gap-2 rounded-xl border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <Plus className="h-3 w-3" /> Adicionar item
                </button>
              </div>

              <div className="space-y-3">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-surface p-3">
                    <div className="flex-1">
                      <Bilingual
                        label={`Item ${i + 1}`}
                        value={item}
                        onChange={(v) => set({ includes: includes.map((it, idx) => (idx === i ? v : it)) })}
                        placeholder={{
                          pt: "Ex: Design responsivo",
                          en: "Ex: Responsive design"
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => set({ includes: includes.filter((_, idx) => idx !== i) })}
                      className="rounded-lg p-2 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <TagsInput
              label="Tags do serviço"
              value={input.tags}
              onChange={(tags) => set({ tags })}
              placeholder="desenvolvimento, design, e-commerce..."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Bilingual
                label="Meta título (SEO)"
                value={input.metaTitle ?? { pt: "", en: "" }}
                onChange={(metaTitle) => set({ metaTitle })}
                placeholder={{
                  pt: "Título para aparecer no Google",
                  en: "Title to appear on Google"
                }}
              />
              <Bilingual
                label="Meta descrição (SEO)"
                value={input.metaDescription ?? { pt: "", en: "" }}
                onChange={(metaDescription) => set({ metaDescription })}
                multiline
                placeholder={{
                  pt: "Descrição para aparecer no Google",
                  en: "Description to appear on Google"
                }}
              />
            </div>

            <Checkbox
              label="Serviço publicado"
              checked={input.publicado}
              onChange={(publicado) => set({ publicado })}
              helpText="Serviços publicados aparecerão na página de serviços"
            />
          </>
        );
      }}
    />
  );
}