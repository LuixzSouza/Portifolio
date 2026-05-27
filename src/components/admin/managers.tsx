"use client";

import { Plus, Trash2 } from "lucide-react";
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
      renderForm={(input, set) => (
        <>
          <Field label="Nome">
            <TextInput value={input.nome} onChange={(nome) => set({ nome })} />
          </Field>
          <ImageField label="Imagem" value={input.imagem ?? ""} onChange={(imagem) => set({ imagem })} />
          <TagsInput label="Tecnologias" value={input.tecnologias} onChange={(tecnologias) => set({ tecnologias })} />
          <Bilingual label="Descrição" value={input.descricao ?? { pt: "", en: "" }} onChange={(descricao) => set({ descricao })} multiline />
          <Bilingual label="Data" value={input.data ?? { pt: "", en: "" }} onChange={(data) => set({ data })} />
          <Field label="LinkedIn">
            <TextInput value={input.links.linkedin ?? ""} onChange={(v) => set({ links: { ...input.links, linkedin: v } })} />
          </Field>
          <Field label="GitHub">
            <TextInput value={input.links.github ?? ""} onChange={(v) => set({ links: { ...input.links, github: v } })} />
          </Field>
          <Field label="Ver projeto (URL)">
            <TextInput value={input.links.verProjeto ?? ""} onChange={(v) => set({ links: { ...input.links, verProjeto: v } })} />
          </Field>
          <Checkbox label="Publicado" checked={input.publicado} onChange={(publicado) => set({ publicado })} />
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
      renderForm={(input, set) => (
        <>
          <Field label="Nome do curso">
            <TextInput value={input.course} onChange={(course) => set({ course })} />
          </Field>
          <Field label="Emissor">
            <TextInput value={input.issuer ?? ""} onChange={(issuer) => set({ issuer })} />
          </Field>
          <Field label="Data / período">
            <TextInput value={input.date ?? ""} onChange={(date) => set({ date })} placeholder="2024" />
          </Field>
          <Field label="PDF (caminho)">
            <TextInput value={input.file ?? ""} onChange={(file) => set({ file })} placeholder="/certificates/x.pdf" />
          </Field>
          <ImageField label="Imagem" value={input.image ?? ""} onChange={(image) => set({ image })} />
          <Bilingual label="Descrição" value={input.descricao ?? { pt: "", en: "" }} onChange={(descricao) => set({ descricao })} multiline />
          <TagsInput label="Skills" value={input.skills} onChange={(skills) => set({ skills })} />
          <Checkbox label="Publicado" checked={input.publicado} onChange={(publicado) => set({ publicado })} />
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
      rowSubtitle={(t) => pair(t.role).pt}
      isPublished={(t) => t.publicado}
      emptyInput={{
        name: "", role: { pt: "", en: "" }, quote: { pt: "", en: "" }, image: "", publicado: true,
      }}
      toInput={(t) => ({
        name: t.name,
        role: pair(t.role),
        quote: pair(t.quote),
        image: t.image ?? "",
        publicado: t.publicado,
      })}
      renderForm={(input, set) => (
        <>
          <Field label="Nome">
            <TextInput value={input.name} onChange={(name) => set({ name })} />
          </Field>
          <Bilingual label="Cargo / relação" value={input.role ?? { pt: "", en: "" }} onChange={(role) => set({ role })} />
          <Bilingual label="Depoimento" value={input.quote ?? { pt: "", en: "" }} onChange={(quote) => set({ quote })} multiline />
          <ImageField label="Foto" value={input.image ?? ""} onChange={(image) => set({ image })} />
          <Checkbox label="Publicado" checked={input.publicado} onChange={(publicado) => set({ publicado })} />
        </>
      )}
    />
  );
}

// --- Timeline ---
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
      emptyInput={{
        year: { pt: "", en: "" }, title: { pt: "", en: "" }, desc: { pt: "", en: "" }, techs: [], publicado: true,
      }}
      toInput={(m) => ({
        year: pair(m.year),
        title: pair(m.title),
        desc: pair(m.desc),
        techs: m.techs,
        publicado: m.publicado,
      })}
      renderForm={(input, set) => (
        <>
          <Bilingual label="Ano / marco" value={input.year} onChange={(year) => set({ year })} />
          <Bilingual label="Título" value={input.title ?? { pt: "", en: "" }} onChange={(title) => set({ title })} />
          <Bilingual label="Descrição" value={input.desc ?? { pt: "", en: "" }} onChange={(desc) => set({ desc })} multiline />
          <TagsInput label="Tecnologias" value={input.techs} onChange={(techs) => set({ techs })} />
          <Checkbox label="Publicado" checked={input.publicado} onChange={(publicado) => set({ publicado })} />
        </>
      )}
    />
  );
}

// --- Skills (grupo + lista aninhada de {name, level}) ---
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
      rowSubtitle={(g) => g.skills.map((s) => s.name).join(", ")}
      emptyInput={{ category: { pt: "", en: "" }, skills: [] }}
      toInput={(g) => ({
        category: pair(g.category),
        skills: g.skills.map((s) => ({ name: s.name, level: s.level })),
      })}
      renderForm={(input, set) => {
        const skills = input.skills;
        const updateSkill = (i: number, patch: Partial<(typeof skills)[number]>) =>
          set({ skills: skills.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
        return (
          <>
            <Bilingual label="Categoria" value={input.category} onChange={(category) => set({ category })} />
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">Skills (nível 1–5)</span>
              {skills.map((s, i) => (
                <div key={i} className="flex items-end gap-3">
                  <div className="flex-1">
                    <TextInput value={s.name} onChange={(name) => updateSkill(i, { name })} placeholder="Nome" />
                  </div>
                  <div className="w-20">
                    <Select value={s.level} onChange={(level) => updateSkill(i, { level })} options={[1, 2, 3, 4, 5]} />
                  </div>
                  <button
                    type="button"
                    onClick={() => set({ skills: skills.filter((_, idx) => idx !== i) })}
                    aria-label="Remover skill"
                    className="rounded-lg p-2.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set({ skills: [...skills, { name: "", level: 3 }] })}
                className="flex w-fit items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <Plus className="h-4 w-4" /> Adicionar skill
              </button>
            </div>
          </>
        );
      }}
    />
  );
}

// --- Serviços (process/includes aninhados) ---
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
      rowSubtitle={(s) => s.slug}
      isPublished={(s) => s.publicado}
      emptyInput={{
        n: "", image: "", accent: "",
        title: { pt: "", en: "" }, tagline: { pt: "", en: "" }, intro: { pt: "", en: "" },
        forWho: { pt: "", en: "" }, process: [], includes: [], tags: [],
        metaTitle: { pt: "", en: "" }, metaDescription: { pt: "", en: "" }, publicado: true,
      }}
      toInput={(s) => ({
        n: s.n ?? "",
        image: s.image ?? "",
        accent: s.accent ?? "",
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
      renderForm={(input, set) => {
        const process = input.process;
        const includes = input.includes;
        return (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Nº (ex.: 01)">
                <TextInput value={input.n ?? ""} onChange={(n) => set({ n })} />
              </Field>
              <Field label="Cor de acento (#hex)">
                <TextInput value={input.accent ?? ""} onChange={(accent) => set({ accent })} placeholder="#5B8DEF" />
              </Field>
            </div>
            <ImageField label="Imagem" value={input.image ?? ""} onChange={(image) => set({ image })} />
            <Bilingual label="Título" value={input.title} onChange={(title) => set({ title })} />
            <Bilingual label="Tagline" value={input.tagline ?? { pt: "", en: "" }} onChange={(tagline) => set({ tagline })} />
            <Bilingual label="Intro" value={input.intro ?? { pt: "", en: "" }} onChange={(intro) => set({ intro })} multiline />
            <Bilingual label="Para quem" value={input.forWho ?? { pt: "", en: "" }} onChange={(forWho) => set({ forWho })} multiline />

            <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 p-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">Processo (etapas)</span>
              {process.map((step, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl bg-surface p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">Etapa {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => set({ process: process.filter((_, idx) => idx !== i) })}
                      aria-label="Remover etapa"
                      className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Bilingual
                    label="Título da etapa"
                    value={step.title}
                    onChange={(title) => set({ process: process.map((p, idx) => (idx === i ? { ...p, title } : p)) })}
                  />
                  <Bilingual
                    label="Descrição da etapa"
                    value={step.desc}
                    onChange={(desc) => set({ process: process.map((p, idx) => (idx === i ? { ...p, desc } : p)) })}
                    multiline
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => set({ process: [...process, { title: { pt: "", en: "" }, desc: { pt: "", en: "" } }] })}
                className="flex w-fit items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <Plus className="h-4 w-4" /> Adicionar etapa
              </button>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 p-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">O que inclui</span>
              {includes.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-xl bg-surface p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">Item {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => set({ includes: includes.filter((_, idx) => idx !== i) })}
                      aria-label="Remover item"
                      className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Bilingual
                    label="Texto"
                    value={item}
                    onChange={(v) => set({ includes: includes.map((it, idx) => (idx === i ? v : it)) })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => set({ includes: [...includes, { pt: "", en: "" }] })}
                className="flex w-fit items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <Plus className="h-4 w-4" /> Adicionar item
              </button>
            </div>

            <TagsInput label="Tags" value={input.tags} onChange={(tags) => set({ tags })} />
            <Bilingual label="Meta título (SEO)" value={input.metaTitle ?? { pt: "", en: "" }} onChange={(metaTitle) => set({ metaTitle })} />
            <Bilingual label="Meta descrição (SEO)" value={input.metaDescription ?? { pt: "", en: "" }} onChange={(metaDescription) => set({ metaDescription })} multiline />
            <Checkbox label="Publicado" checked={input.publicado} onChange={(publicado) => set({ publicado })} />
          </>
        );
      }}
    />
  );
}
