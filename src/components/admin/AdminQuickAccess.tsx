"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, LogOut, Shield, ChevronDown, BarChart3 } from "lucide-react";
import { useAdmin } from "./AdminProvider";

export function AdminQuickAccess() {
  const { user, logout } = useAdmin();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show quick access only when logged in
  useEffect(() => {
    setIsVisible(!!user);
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showDropdown) return;
    const onClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [showDropdown]);

  if (!isVisible) return null;

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 left-6 z-40 md:bottom-8 md:left-8"
    >
      {/* Quick Access Button */}
      <div className="relative">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 rounded-2xl border border-foreground/20 bg-background/95 backdrop-blur-xl px-4 py-3 shadow-xl transition-all duration-300 hover:border-foreground/40 hover:shadow-2xl"
        >
          {/* Status indicator */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <Shield className="h-5 w-5 text-green-600" />
            <motion.div
              className="absolute inset-0 rounded-xl bg-green-500/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* User info */}
          <div className="hidden text-left sm:block">
            <div className="font-roobert text-sm font-semibold text-foreground">
              Admin
            </div>
            <div className="text-xs text-muted">
              {user?.username}
            </div>
          </div>

          {/* Dropdown indicator */}
          <motion.div
            animate={{ rotate: showDropdown ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-muted" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-0 mb-3 w-64 overflow-hidden rounded-2xl border border-foreground/10 bg-surface/95 backdrop-blur-xl shadow-2xl"
            >
              {/* Header */}
              <div className="border-b border-foreground/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-roobert font-semibold text-foreground">
                      {user?.username}
                    </div>
                    <div className="text-xs text-muted">
                      Administrador
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <motion.a
                  href="/admin"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm transition-all duration-200 hover:bg-foreground/5"
                  onClick={() => setShowDropdown(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                    <Settings className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      Painel Administrativo
                    </div>
                    <div className="text-xs text-muted">
                      Gerenciar conteúdo
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href="/admin#overview"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm transition-all duration-200 hover:bg-foreground/5"
                  onClick={() => setShowDropdown(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      Visão Geral
                    </div>
                    <div className="text-xs text-muted">
                      Estatísticas e métricas
                    </div>
                  </div>
                </motion.a>

                <div className="my-2 h-px bg-foreground/10" />

                <motion.button
                  type="button"
                  onClick={handleLogout}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-sm transition-all duration-200 hover:bg-red-500/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                    <LogOut className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-red-600">
                      Sair da sessão
                    </div>
                    <div className="text-xs text-red-500/70">
                      Fazer logout
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}