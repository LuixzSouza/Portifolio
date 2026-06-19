"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Plus,
  Search,
  Trash2,
  X,
  Edit3,
  Eye,
  EyeOff,
  Grid3X3,
  GripVertical,
  List,
} from "lucide-react";
import { ApiError } from "@/lib/api";
import { PreviewCard, PreviewGrid, type PreviewData } from "./PreviewCard";
import { AdminLangProvider, AdminLangTabs } from "./fields";
import { useToast } from "./Toast";

export interface EntityManagerProps<TItem, TInput> {
  title: string;
  fetchAll: () => Promise<TItem[]>;
  create: (input: TInput) => Promise<TItem>;
  update: (id: number, input: TInput) => Promise<TItem>;
  remove: (id: number) => Promise<void>;
  reorder?: (ids: number[]) => Promise<void>;
  getId: (item: TItem) => number;
  rowTitle: (item: TItem) => string;
  rowSubtitle?: (item: TItem) => string;
  isPublished?: (item: TItem) => boolean;
  emptyInput: TInput;
  toInput: (item: TItem) => TInput;
  toPreview: (item: TItem) => PreviewData;
  previewType?: "project" | "certificate" | "testimonial" | "service" | "generic";
  renderForm: (input: TInput, set: (patch: Partial<TInput>) => void) => React.ReactNode;
}

type Editing<TItem> = { mode: "new" } | { mode: "edit"; item: TItem } | null;
type ViewMode = "grid" | "list";
type FilterType = "all" | "published" | "draft";

export function EntityManager<TItem, TInput>(props: EntityManagerProps<TItem, TInput>) {
  const {
    title, fetchAll, create, update, remove, reorder, getId, rowTitle, rowSubtitle,
    isPublished, emptyInput, toInput, toPreview, previewType = "generic", renderForm,
  } = props;

  // Data state
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing<TItem>>(null);
  const [input, setInput] = useState<TInput>(emptyInput);
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState<TItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [query, setQuery] = useState("");

  // Drag-and-drop (reordenação)
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);

  const toast = useToast();

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAll()
      .then(setItems)
      .catch((e: unknown) => setError(e instanceof ApiError ? e.message : "Erro ao carregar dados."))
      .finally(() => setLoading(false));
  }, [fetchAll]);

  useEffect(() => load(), [load]);

  // Filtering
  const q = query.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesSearch = !q ||
      `${rowTitle(item)} ${rowSubtitle ? rowSubtitle(item) : ""}`.toLowerCase().includes(q);

    const matchesFilter =
      filterType === "all" ||
      (filterType === "published" && isPublished?.(item)) ||
      (filterType === "draft" && !isPublished?.(item));

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: items.length,
    published: isPublished ? items.filter(isPublished).length : 0,
    draft: isPublished ? items.filter(item => !isPublished(item)).length : 0,
  };

  const openNew = () => {
    setInput(emptyInput);
    setEditing({ mode: "new" });
  };

  const openEdit = (item: TItem) => {
    setInput(toInput(item));
    setEditing({ mode: "edit", item });
  };

  const closeModal = () => {
    setEditing(null);
    setInput(emptyInput);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.mode === "new") {
        const newItem = await create(input);
        setItems((prev) => [newItem, ...prev]);
      } else {
        const updated = await update(getId(editing.item), input);
        setItems((prev) => prev.map((item) => (getId(item) === getId(editing.item) ? updated : item)));
      }
      closeModal();
      toast.success("Salvo com sucesso.");
    } catch (e: unknown) {
      toast.error(e instanceof ApiError ? e.message : "Erro ao salvar.");
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!confirming) return;
    setDeleting(true);
    try {
      await remove(getId(confirming));
      setItems((prev) => prev.filter((i) => getId(i) !== getId(confirming)));
      setConfirming(null);
      toast.success("Item excluído.");
    } catch (e: unknown) {
      toast.error(e instanceof ApiError ? e.message : "Erro ao excluir.");
    }
    setDeleting(false);
  };

  // Reordenar só faz sentido sobre a lista completa (sem busca nem filtro), em
  // modo lista. A ordem otimista é gravada via reorder(ids); recarrega no erro.
  const canReorder = Boolean(reorder) && !q && filterType === "all" && viewMode === "list";

  const handleDrop = (targetId: number) => {
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
        toast.error(e instanceof ApiError ? e.message : "Erro ao reordenar.");
        load();
      });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="font-roobert text-2xl font-semibold text-foreground">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{stats.total} total</span>
            {isPublished && (
              <>
                <span>•</span>
                <span className="text-green-600">{stats.published} publicados</span>
                <span>•</span>
                <span className="text-orange-600">{stats.draft} rascunhos</span>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <Plus className="h-4 w-4" />
          Criar {title.slice(0, -1).toLowerCase()}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder={`Buscar ${title.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-foreground/20 bg-background pl-10 pr-4 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:outline-none"
          />
        </div>

        {/* Filters & View */}
        <div className="flex items-center gap-2">
          {isPublished && (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="rounded-xl border border-foreground/20 bg-background px-3 py-2.5 text-sm transition-colors focus:border-foreground/40"
            >
              <option value="all">Todos</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
            </select>
          )}

          <div className="flex rounded-xl border border-foreground/20 bg-background">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-l-xl transition-colors ${
                viewMode === "grid" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-r-xl transition-colors ${
                viewMode === "list" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <p className="text-sm text-red-500">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="mt-2 text-xs text-red-500/70 hover:text-red-500"
          >
            Dispensar
          </button>
        </motion.div>
      )}

      {/* Dica de reordenação */}
      {canReorder && filteredItems.length > 1 && (
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <GripVertical className="h-3.5 w-3.5" />
          Arraste pelo ícone para reordenar — a ordem é salva automaticamente.
        </p>
      )}
      {reorder && viewMode === "grid" && !query && filterType === "all" && (
        <p className="text-xs text-muted">
          Dica: troque para a visualização em lista para reordenar arrastando.
        </p>
      )}

      {/* Content */}
      {loading ? (
        <LoadingView viewMode={viewMode} />
      ) : filteredItems.length === 0 ? (
        <EmptyView
          title={title}
          hasQuery={!!query}
          onCreate={openNew}
        />
      ) : viewMode === "grid" ? (
        <PreviewGrid>
          {filteredItems.map((item) => (
            <div key={getId(item)} className="relative group">
              <PreviewCard
                data={toPreview(item)}
                type={previewType}
              />
              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-white"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(item)}
                  className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </PreviewGrid>
      ) : (
        <ListView
          items={filteredItems}
          getId={getId}
          rowTitle={rowTitle}
          rowSubtitle={rowSubtitle}
          isPublished={isPublished}
          onEdit={openEdit}
          onDelete={setConfirming}
          canReorder={canReorder}
          dragId={dragId}
          overId={overId}
          onDragStart={setDragId}
          onDragOver={setOverId}
          onDrop={handleDrop}
          onDragEnd={() => {
            setDragId(null);
            setOverId(null);
          }}
        />
      )}

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <EditModal
            title={editing.mode === "new" ? `Criar ${title.slice(0, -1)}` : `Editar ${title.slice(0, -1)}`}
            input={input}
            setInput={setInput}
            onSave={handleSave}
            onClose={closeModal}
            saving={saving}
            renderForm={renderForm}
          />
        )}
      </AnimatePresence>

      {/* Confirmação de exclusão */}
      <AnimatePresence>
        {confirming && (
          <ConfirmDialog
            itemName={rowTitle(confirming)}
            deleting={deleting}
            onConfirm={confirmDelete}
            onCancel={() => !deleting && setConfirming(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfirmDialog({
  itemName,
  deleting,
  onConfirm,
  onCancel,
}: {
  itemName: string;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-foreground/15 bg-background shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-roobert text-lg font-semibold text-foreground">
              Excluir item?
            </h3>
            <p className="text-sm text-muted">
              Você está prestes a excluir{" "}
              <span className="font-medium text-foreground">“{itemName}”</span>. Esta ação não pode
              ser desfeita.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-foreground/10 p-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-xl border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {deleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Supporting Components
function LoadingView({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "grid") {
    return (
      <PreviewGrid>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-2xl border border-foreground/10 bg-surface animate-pulse" />
        ))}
      </PreviewGrid>
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 rounded-xl border border-foreground/10 bg-surface animate-pulse" />
      ))}
    </div>
  );
}

function EmptyView({ title, hasQuery, onCreate }: {
  title: string;
  hasQuery: boolean;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-foreground/10 p-3 mb-4">
        {hasQuery ? (
          <Search className="h-6 w-6 text-muted" />
        ) : (
          <Plus className="h-6 w-6 text-muted" />
        )}
      </div>
      <h3 className="font-roobert font-semibold text-foreground mb-2">
        {hasQuery ? "Nenhum resultado encontrado" : `Nenhum ${title.toLowerCase().slice(0, -1)} ainda`}
      </h3>
      <p className="text-sm text-muted mb-6 max-w-md">
        {hasQuery
          ? "Tente ajustar sua busca ou filtros para encontrar o que procura."
          : `Comece criando seu primeiro ${title.toLowerCase().slice(0, -1)} para vê-lo aparecer aqui.`
        }
      </p>
      {!hasQuery && (
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/90"
        >
          <Plus className="h-4 w-4" />
          Criar {title.toLowerCase().slice(0, -1)}
        </button>
      )}
    </div>
  );
}

function ListView<TItem>({
  items,
  getId,
  rowTitle,
  rowSubtitle,
  isPublished,
  onEdit,
  onDelete,
  canReorder = false,
  dragId = null,
  overId = null,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  items: TItem[];
  getId: (item: TItem) => number;
  rowTitle: (item: TItem) => string;
  rowSubtitle?: (item: TItem) => string;
  isPublished?: (item: TItem) => boolean;
  onEdit: (item: TItem) => void;
  onDelete: (item: TItem) => void;
  canReorder?: boolean;
  dragId?: number | null;
  overId?: number | null;
  onDragStart?: (id: number) => void;
  onDragOver?: (id: number) => void;
  onDrop?: (id: number) => void;
  onDragEnd?: () => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const published = isPublished?.(item);
        const id = getId(item);
        return (
          <motion.div
            key={id}
            layout
            onDragOver={canReorder ? (e) => { e.preventDefault(); onDragOver?.(id); } : undefined}
            onDrop={canReorder ? (e) => { e.preventDefault(); onDrop?.(id); } : undefined}
            className={`group flex items-center gap-4 rounded-xl border bg-surface p-4 transition-colors hover:border-foreground/20 ${
              dragId === id ? "border-foreground/20 opacity-40" : "border-foreground/10"
            } ${overId === id && dragId !== id ? "ring-2 ring-inset ring-foreground/30" : ""}`}
          >
            {canReorder && (
              <span
                draggable
                onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; onDragStart?.(id); }}
                onDragEnd={() => onDragEnd?.()}
                aria-label="Arrastar para reordenar"
                className="-ml-1 shrink-0 cursor-grab rounded-lg p-1 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground truncate">
                  {rowTitle(item)}
                </h3>
                {isPublished && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      published
                        ? "bg-green-500/10 text-green-600"
                        : "bg-orange-500/10 text-orange-600"
                    }`}
                  >
                    {published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {published ? "Publicado" : "Rascunho"}
                  </span>
                )}
              </div>
              {rowSubtitle && (
                <p className="text-sm text-muted truncate">
                  {rowSubtitle(item)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="flex items-center gap-1 rounded-lg border border-foreground/20 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <Edit3 className="h-3 w-3" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10"
              >
                <Trash2 className="h-3 w-3" />
                Excluir
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function EditModal<TInput>({
  title,
  input,
  setInput,
  onSave,
  onClose,
  saving,
  renderForm,
}: {
  title: string;
  input: TInput;
  setInput: (input: TInput) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
  renderForm: (input: TInput, set: (patch: Partial<TInput>) => void) => React.ReactNode;
}) {
  const set = (patch: Partial<TInput>) => setInput({ ...input, ...patch });

  const formRef = useRef<HTMLDivElement>(null);
  // Snapshot do input ao abrir — base para detectar alterações não salvas.
  const initialRef = useRef(JSON.stringify(input));
  const isDirty = JSON.stringify(input) !== initialRef.current;

  // Fecha com guarda de alterações não salvas.
  const requestClose = useCallback(() => {
    if (saving) return;
    if (isDirty && !window.confirm("Descartar as alterações não salvas?")) return;
    onClose();
  }, [saving, isDirty, onClose]);

  // Trava o scroll do fundo e fecha no Escape enquanto o modal está aberto.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [requestClose]);

  // Foca o primeiro campo ao abrir.
  useEffect(() => {
    const el = formRef.current?.querySelector<HTMLElement>("input, textarea, select");
    el?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      <AdminLangProvider>
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-background rounded-2xl border border-foreground/20 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-foreground/10 p-6">
            <h3 className="font-roobert text-lg font-semibold text-foreground">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <AdminLangTabs />
              <button
                type="button"
                onClick={requestClose}
                aria-label="Fechar"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            {renderForm(input, set)}
          </div>

          {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-foreground/10 p-6">
          <span className="text-xs text-muted">
            {isDirty ? "Alterações não salvas" : ""}
          </span>
          <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={requestClose}
            disabled={saving}
            className="rounded-xl border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
          >
            {saving && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background/20 border-t-background" />
            )}
            Salvar
          </button>
          </div>
          </div>
        </motion.div>
      </AdminLangProvider>
    </motion.div>
  );
}