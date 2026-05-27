/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Settings, X, Lock, Keyboard, Monitor, Plus, Check, BarChart3 } from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";

interface DashboardAccess {
  enabled: boolean;
  isAdmin: boolean;
  quickActions: QuickAction[];
}

interface QuickAction {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

export function DashboardAccessButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [access, setAccess] = useState<DashboardAccess>({
    enabled: false,
    isAdmin: false,
    quickActions: []
  });

  // Check access permissions
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    const hasFlag = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("dev");
    const hasAdminFlag = typeof window !== "undefined" && (
      localStorage.getItem("admin_access") === "true" ||
      new URLSearchParams(window.location.search).has("admin")
    );

    if (isDev || hasFlag) {
      const quickActions: QuickAction[] = [
        {
          id: "dashboard",
          name: "Dashboard",
          href: "/dashboard",
          icon: Monitor,
          description: "Centro de controle principal"
        },
        {
          id: "work-enhanced",
          name: "Portfólio Avançado",
          href: "/work/enhanced",
          icon: BarChart3,
          description: "Dashboard de projetos"
        },
        {
          id: "admin",
          name: "Painel Admin",
          href: "/admin",
          icon: Lock,
          description: "CRUD de conteúdo",
          badge: hasAdminFlag ? "Auth" : "Login"
        }
      ];

      setAccess({
        enabled: true,
        isAdmin: hasAdminFlag,
        quickActions
      });
    }
  }, []);

  // Keyboard shortcut (Ctrl/Cmd + Shift + D)
  useEffect(() => {
    if (!access.enabled) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [access.enabled]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-dashboard-menu]")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!access.enabled) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" data-dashboard-menu>
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-2xl ${
          isOpen
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-foreground/20 bg-background/90 text-foreground backdrop-blur-md hover:border-foreground/40 hover:bg-surface/50"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse effect for unread notifications */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-20 right-0 w-80 rounded-2xl border border-foreground/20 bg-background/95 p-4 shadow-2xl backdrop-blur-md"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <Monitor className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <Text className="font-medium">Ferramentas Dev</Text>
                  <Text size="sm" tone="muted">Acesso rápido</Text>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <Text size="sm" className="text-green-600 font-medium">
                  {access.isAdmin ? "Admin" : "Dev"}
                </Text>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {access.quickActions.map((action, _index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: _index * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-foreground/20 hover:bg-surface/50"
                    >
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Text className="font-medium">{action.name}</Text>
                          {action.badge && (
                            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                              action.badge === "Auth" ? "bg-green-500/20 text-green-600" : "bg-orange-500/20 text-orange-600"
                            }`}>
                              {action.badge}
                            </span>
                          )}
                        </div>
                        <Text size="sm" tone="muted">{action.description}</Text>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3">
              <div className="flex items-center gap-1 text-xs text-muted">
                <Keyboard className="h-3 w-3" />
                <span>⌘⇧D</span>
              </div>
              <Text size="sm" tone="muted">
                {process.env.NODE_ENV === "development" ? "Development" : "Debug Mode"}
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-foreground/20 bg-background/95 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-md"
          >
            Ferramentas Dev
            <div className="absolute left-full top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-foreground/20 bg-background/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enable dashboard access hook
export function useEnableDashboard() {
  const enableAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_access", "true");
      window.location.reload();
    }
  };

  const disableAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_access");
      window.location.reload();
    }
  };

  return { enableAccess, disableAccess };
}

// Secret activation component (hidden in footer or triggered by konami code)
export function DashboardActivator() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const { enableAccess } = useEnableDashboard();

  // Konami code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, KeyB, KeyA
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-konamiCode.length);
      setSequence(newSequence);

      if (newSequence.length === konamiCode.length &&
          newSequence.every((key, index) => key === konamiCode[index])) {
        setIsActivated(true);
        enableAccess();

        // Show activation message
        const notification = document.createElement("div");
        notification.innerHTML = `
          <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1a1a1a;
            color: #00ff00;
            padding: 20px;
            border-radius: 10px;
            font-family: monospace;
            z-index: 9999;
            border: 2px solid #00ff00;
            animation: glow 1s ease-in-out infinite alternate;
          ">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">🚀 DASHBOARD ATIVADO 🚀</div>
              <div>Acesso liberado às ferramentas avançadas!</div>
            </div>
          </div>
          <style>
            @keyframes glow {
              from { box-shadow: 0 0 5px #00ff00; }
              to { box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
            }
          </style>
        `;

        document.body.appendChild(notification);
        setTimeout(() => document.body.removeChild(notification), 3000);

        setSequence([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sequence, enableAccess]);

  return null; // This component is invisible and only listens to keyboard
}