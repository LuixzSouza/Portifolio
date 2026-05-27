"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  error?: string | null;
  onSave: () => void;
  onCancel?: () => void;
  saving?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function EnhancedModal({
  isOpen,
  onClose,
  title,
  children,
  error,
  onSave,
  onCancel,
  saving = false,
  size = "lg"
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                scale: { duration: 0.3 }
              }}
              className={`w-full ${sizeClasses[size]} my-8 bg-background rounded-3xl shadow-2xl border border-foreground/20 overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-foreground/10 bg-surface/30">
                <motion.h2
                  layout
                  className="font-roobert text-xl font-semibold text-foreground"
                >
                  {title}
                </motion.h2>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl p-2.5 text-muted transition-all duration-200 hover:bg-foreground/10 hover:text-foreground"
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                  {children}
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mx-6 mb-2"
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-600">Erro ao salvar</p>
                        <p className="text-sm text-red-600/80 mt-1">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-foreground/10 bg-surface/20">
                <motion.button
                  type="button"
                  onClick={onCancel || onClose}
                  disabled={saving}
                  whileHover={!saving ? { scale: 1.02 } : undefined}
                  whileTap={!saving ? { scale: 0.98 } : undefined}
                  className="rounded-xl border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  whileHover={!saving ? { scale: 1.02 } : undefined}
                  whileTap={!saving ? { scale: 0.98 } : undefined}
                  className="flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full"
                    />
                  )}
                  {saving ? "Salvando..." : "Salvar"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}