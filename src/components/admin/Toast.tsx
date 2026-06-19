"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastItemData {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

// Erros ficam mais tempo (o usuário precisa ler); sucesso some rápido.
const DURATION: Record<ToastKind, number> = { success: 2600, error: 6000, info: 4000 };

/**
 * Provider de feedback do painel: expõe useToast() com success/error/info e
 * renderiza a pilha de toasts no canto inferior direito. Unifica os avisos de
 * salvar/excluir/reordenar que antes eram inline e inconsistentes entre telas.
 */
export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, kind, message }]);
      window.setTimeout(() => remove(id), DURATION[kind]);
    },
    [remove],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
      info: (m) => push("info", m),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[80] flex w-[min(92vw,22rem)] flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <AdminToastProvider>.");
  return ctx;
}

const STYLES: Record<ToastKind, { icon: typeof CheckCircle2; accent: string }> = {
  success: { icon: CheckCircle2, accent: "text-emerald-500" },
  error: { icon: AlertCircle, accent: "text-red-500" },
  info: { icon: Info, accent: "text-blue-500" },
};

function ToastItem({ toast, onClose }: { toast: ToastItemData; onClose: () => void }) {
  const { icon: Icon, accent } = STYLES[toast.kind];
  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-foreground/10 bg-surface px-4 py-3 shadow-2xl shadow-black/30"
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${accent}`} />
      <p className="flex-1 text-sm text-foreground">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="-mr-1 rounded-lg p-1 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
