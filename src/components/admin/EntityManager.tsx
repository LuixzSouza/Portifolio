"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, GripVertical, Plus, Search, Trash2, X } from "lucide-react";
import { ApiError } from "@/lib/api";

export interface EntityManagerProps<TItem, TInput> {
  title: string;
  fetchAll: () => Promise<TItem[]>;
  create: (input: TInput) => Promise<TItem>;
  update: (id: number, input: TInput) => Promise<TItem>;
  remove: (id: number) => Promise<void>;
  /** Se presente, habilita reordenar por arrastar; grava a nova ordem dos ids. */
  reorder?: (ids: number[]) => Promise<void>;
  getId: (item: TItem) => number;
  rowTitle: (item: TItem) => string;
  rowSubtitle?: (item: TItem) => string;
  isPublished?: (item: TItem) => boolean;
  emptyInput: TInput;
  toInput: (item: TItem) => TInput;
  /** Render do formulário; `set` faz merge parcial no input. */
  renderForm: (input: TInput, set: (patch: Partial<TInput>) => void) => React.ReactNode;
}

type Editing<TItem> = { mode: "new" } | { mode: "edit"; item: TItem } | null;

export function EntityManager<TItem, TInput>(props: EntityManagerProps<TItem, TInput>) {
  const {
    title, fetchAll, create, update, remove, reorder, getId, rowTitle, rowSubtitle,
    isPublished, emptyInput, toInput, renderForm,
  } = props;

  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing<TItem>>(null);
  const [input, setInput] = useState<TInput>(emptyInput);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((item) =>
        `${rowTitle(item)} ${rowSubtitle ? rowSubtitle(item) : ""}`.toLowerCase().includes(q),
      )
    : items;

  // Reordenar só faz sentido sobre a lista completa (sem filtro de busca).
  const canReorder = Boolean(reorder) && q === "";

  function handleDrop(targetId: number) {
    const from = dragId;
    setDragId(null);
    setOverId(null);
    if (from === null || from === targetId || !reorder) return;
    setItems((prev) => {
      const fromIdx = prev.findIndex((it) => getId(it) === from);
      const toIdx = prev.findIndex((it) => getId(it) === targetId);
      if (fromIdx < 0 || toIdx < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      reorder(next.map(getId)).catch((e: unknown) => {
        setError(e instanceof ApiError ? e.message : "Erro ao reordenar.");
        load();
      });
      return next;
    });
  }

  const load = useCallback(() => {
    setLoading(true);
    fetchAll()
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof ApiError ? e.message : "Erro ao carregar."))
      .finally(() => setLoading(false));
  }, [fetchAll]);

  useEffect(() => load(), [load]);

  function startNew() {
    setInput(emptyInput);
    setEditing({ mode: "new" });
    setError(null);
  }

  function startEdit(item: TItem) {
    setInput(toInput(item));
    setEditing({ mode: "edit", item });
    setError(null);
  }

  const set = useCallback((patch: Partial<TInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      if (editing.mode === "edit") await update(getId(editing.item), input);
      else await create(input);
      setEditing(null);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2600);
      load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(item: TItem) {
    if (!window.confirm(`Excluir "${rowTitle(item)}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await remove(getId(item));
      load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Erro ao excluir.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-roobert text-2xl font-semibold text-foreground">{title}</h2>
          {!loading && items.length > 0 && (
            <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-muted">
              {items.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={startNew}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Novo
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-3 rounded-2xl border border-foreground/10 bg-surface px-4 py-4"
            >
              <div className="h-3.5 w-1/3 rounded-full bg-foreground/10" />
              <div className="ml-auto h-3 w-16 rounded-full bg-foreground/[0.06]" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-foreground/15 px-6 py-14 text-center">
          <p className="text-sm text-muted">Nenhum item ainda.</p>
          <button
            type="button"
            onClick={startNew}
            className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Criar o primeiro
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Buscar em ${items.length} ${items.length === 1 ? "item" : "itens"}…`}
              className="w-full rounded-xl border border-foreground/15 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/40"
            />
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted">Nenhum resultado para “{query}”.</p>
          ) : (
            <>
              {canReorder && (
                <p className="text-xs text-muted">Arraste pelo ícone <GripVertical className="inline h-3.5 w-3.5 align-text-bottom" /> para reordenar.</p>
              )}
              <ul className="flex flex-col divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10">
                {filtered.map((item) => {
                  const id = getId(item);
                  return (
            <li
              key={id}
              onDragOver={canReorder ? (e) => { e.preventDefault(); setOverId(id); } : undefined}
              onDrop={canReorder ? (e) => { e.preventDefault(); handleDrop(id); } : undefined}
              className={`flex items-center justify-between gap-2 bg-surface px-4 py-3 transition-colors ${
                dragId === id ? "opacity-40" : ""
              } ${overId === id && dragId !== id ? "ring-2 ring-inset ring-foreground/30" : ""}`}
            >
              {canReorder && (
                <span
                  draggable
                  onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setDragId(id); }}
                  onDragEnd={() => { setDragId(null); setOverId(null); }}
                  aria-label="Arrastar para reordenar"
                  className="-ml-1 cursor-grab rounded-lg p-1 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4" />
                </span>
              )}
              <button type="button" onClick={() => startEdit(item)} className="flex flex-1 flex-col items-start text-left">
                <span className="flex items-center gap-2 font-roobert text-sm font-medium text-foreground">
                  {rowTitle(item)}
                  {isPublished && !isPublished(item) && (
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      rascunho
                    </span>
                  )}
                </span>
                {rowSubtitle && <span className="text-xs text-muted">{rowSubtitle(item)}</span>}
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                aria-label="Excluir"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}

      <AnimatePresence>
      {editing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-6 shadow-2xl shadow-black/30 md:p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-roobert text-lg font-semibold text-foreground">
                {editing.mode === "new" ? `Novo — ${title}` : `Editar — ${title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Fechar"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5">{renderForm(input, set)}</div>

            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-foreground/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Salvando…" : "Salvar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-2xl border border-foreground/10 bg-surface px-4 py-3 text-sm font-medium text-foreground shadow-2xl shadow-black/30"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Salvo com sucesso.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
