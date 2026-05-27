/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Smartphone, Download, Bell, Wifi, WifiOff, RefreshCw,
  Settings, Check, X, AlertCircle, Zap, Globe, Monitor,
  Share, Home, Star, Clock, Database, Signal
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";

// Types
interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  notificationsEnabled: boolean;
  notificationsSupported: boolean;
  lastUpdate: string | null;
  cacheStatus: CacheStatus;
  networkStatus: NetworkStatus;
}

interface CacheStatus {
  size: number;
  lastUpdated: string;
  entries: number;
  status: "healthy" | "stale" | "error";
}

interface NetworkStatus {
  type: "wifi" | "cellular" | "ethernet" | "none";
  speed: "slow" | "medium" | "fast";
  latency: number;
}

interface PWAFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

// Context
interface PWAContextType extends PWAState {
  install: () => Promise<boolean>;
  update: () => Promise<boolean>;
  enableNotifications: () => Promise<boolean>;
  disableNotifications: () => void;
  clearCache: () => Promise<void>;
  shareApp: () => Promise<boolean>;
  addToHomescreen: () => void;
  checkForUpdates: () => Promise<boolean>;
  features: PWAFeature[];
}

const PWAContext = createContext<PWAContextType | null>(null);

// Storage keys
const STORAGE_KEYS = {
  PWA_STATE: "pwa_state",
  NOTIFICATIONS: "pwa_notifications",
  INSTALL_PROMPT: "pwa_install_prompt"
};

// Provider Component
export function PWAProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator?.onLine ?? true,
    hasUpdate: false,
    notificationsEnabled: false,
    notificationsSupported: "Notification" in window && "serviceWorker" in navigator,
    lastUpdate: null,
    cacheStatus: {
      size: 0,
      lastUpdated: new Date().toISOString(),
      entries: 0,
      status: "healthy"
    },
    networkStatus: {
      type: "wifi",
      speed: "fast",
      latency: 0
    }
  });

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration | null>(null);

  // Initialize PWA features
  useEffect(() => {
    initializePWA();
    setupEventListeners();
    checkNetworkStatus();
  }, []);

  const initializePWA = async () => {
    // Check if already installed
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    // Register service worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        setServiceWorker(registration);

        // Check for updates
        registration.addEventListener("updatefound", () => {
          setState(prev => ({ ...prev, hasUpdate: true }));
        });
      } catch (error) {
        console.warn("Service Worker registration failed:", error);
      }
    }

    // Check notification permission
    const notificationsEnabled = "Notification" in window &&
      Notification.permission === "granted";

    // Load saved state
    const savedState = localStorage.getItem(STORAGE_KEYS.PWA_STATE);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState(prev => ({ ...prev, ...parsed, isInstalled, notificationsEnabled }));
      } catch (error) {
        console.warn("Failed to load PWA state:", error);
      }
    }

    setState(prev => ({ ...prev, isInstalled, notificationsEnabled }));
  };

  const setupEventListeners = () => {
    // Install prompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setState(prev => ({ ...prev, isInstallable: true }));
    });

    // App installed event
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
    });

    // Online/offline events
    window.addEventListener("online", () => {
      setState(prev => ({ ...prev, isOnline: true }));
    });

    window.addEventListener("offline", () => {
      setState(prev => ({ ...prev, isOnline: false }));
    });

    // Visibility change (app focus)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        checkForUpdates();
        checkNetworkStatus();
      }
    });
  };

  const checkNetworkStatus = async () => {
    try {
      const start = Date.now();
      await fetch("/favicon.ico", { method: "HEAD" });
      const latency = Date.now() - start;

      const connection = (navigator as unknown as { connection?: { type: string; downlink: number; effectiveType: string; saveData: boolean; rtt: number } }).connection;
      const networkInfo: NetworkStatus = {
        type: (connection?.type as "none" | "wifi" | "cellular" | "ethernet") || "wifi",
        speed: latency < 100 ? "fast" : latency < 300 ? "medium" : "slow",
        latency
      };

      setState(prev => ({ ...prev, networkStatus: networkInfo }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        networkStatus: { type: "none", speed: "slow", latency: -1 }
      }));
    }
  };

  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    try {
      const result = await deferredPrompt.prompt();
      setDeferredPrompt(null);

      if (result.outcome === "accepted") {
        setState(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Installation failed:", error);
      return false;
    }
  }, [deferredPrompt]);

  const update = useCallback(async (): Promise<boolean> => {
    if (!serviceWorker) return false;

    try {
      const waiting = serviceWorker.waiting;
      if (waiting) {
        waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Update failed:", error);
      return false;
    }
  }, [serviceWorker]);

  const enableNotifications = useCallback(async (): Promise<boolean> => {
    if (!state.notificationsSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      const enabled = permission === "granted";

      setState(prev => ({ ...prev, notificationsEnabled: enabled }));

      if (enabled) {
        // Schedule welcome notification
        setTimeout(() => {
          new Notification("Portfólio Luiz Souza", {
            body: "Notificações ativadas! Você receberá atualizações sobre novos projetos.",
            icon: "/icons/icon-192.png",
            badge: "/icons/badge-72.png"
          });
        }, 1000);
      }

      return enabled;
    } catch (error) {
      console.error("Notification permission failed:", error);
      return false;
    }
  }, [state.notificationsSupported]);

  const disableNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notificationsEnabled: false }));
  }, []);

  const clearCache = useCallback(async (): Promise<void> => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );

      setState(prev => ({
        ...prev,
        cacheStatus: {
          size: 0,
          lastUpdated: new Date().toISOString(),
          entries: 0,
          status: "healthy"
        }
      }));
    } catch (error) {
      console.error("Cache clear failed:", error);
    }
  }, []);

  const shareApp = useCallback(async (): Promise<boolean> => {
    if (!navigator.share) return false;

    try {
      await navigator.share({
        title: "Portfólio - Luiz Souza",
        text: "Confira o portfólio de desenvolvimento front-end do Luiz Souza",
        url: window.location.origin
      });
      return true;
    } catch (error) {
      console.error("Sharing failed:", error);
      return false;
    }
  }, []);

  const addToHomescreen = useCallback(() => {
    // Show custom instructions for iOS
    if (/(iPad|iPhone|iPod)/.test(navigator.userAgent)) {
      alert("Para adicionar à tela inicial:\n1. Toque no botão de compartilhar\n2. Selecione 'Adicionar à Tela Inicial'");
    }
  }, []);

  const checkForUpdates = useCallback(async (): Promise<boolean> => {
    if (!serviceWorker) return false;

    try {
      await serviceWorker.update();
      const hasUpdate = serviceWorker.waiting !== null;
      setState(prev => ({ ...prev, hasUpdate }));
      return hasUpdate;
    } catch (error) {
      console.error("Update check failed:", error);
      return false;
    }
  }, [serviceWorker]);

  const features: PWAFeature[] = [
    {
      id: "install",
      name: "Instalar App",
      description: "Adicione o portfólio como app nativo",
      enabled: state.isInstallable,
      icon: Download,
      action: install
    },
    {
      id: "notifications",
      name: "Notificações",
      description: "Receba atualizações sobre novos projetos",
      enabled: state.notificationsSupported,
      icon: Bell,
      action: state.notificationsEnabled ? disableNotifications : enableNotifications
    },
    {
      id: "share",
      name: "Compartilhar",
      description: "Compartilhe o portfólio com outros",
      enabled: "share" in navigator,
      icon: Share,
      action: shareApp
    },
    {
      id: "offline",
      name: "Modo Offline",
      description: "Funciona sem conexão com a internet",
      enabled: true,
      icon: state.isOnline ? Wifi : WifiOff,
      action: () => {}
    }
  ];

  const contextValue: PWAContextType = {
    ...state,
    install,
    update,
    enableNotifications,
    disableNotifications,
    clearCache,
    shareApp,
    addToHomescreen,
    checkForUpdates,
    features
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {children}
    </PWAContext.Provider>
  );
}

// Hook
export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error("usePWA must be used within PWAProvider");
  }
  return context;
}

// Install Banner Component
export function PWAInstallBanner() {
  const { isInstallable, install, isInstalled } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(STORAGE_KEYS.INSTALL_PROMPT) === "dismissed";
    setDismissed(wasDismissed);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEYS.INSTALL_PROMPT, "dismissed");
  };

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setDismissed(true);
    }
  };

  if (!isInstallable || isInstalled || dismissed) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
    >
      <div className="rounded-2xl border border-foreground/20 bg-background/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>

          <div className="flex-1">
            <Heading as="h3" size="display-sm" className="mb-1">
              Instalar Portfólio
            </Heading>
            <Text size="sm" tone="muted" className="mb-3">
              Tenha acesso rápido como um app nativo
            </Text>

            <div className="flex gap-2">
              <Button size="md" onClick={handleInstall} className="gap-2">
                <Download className="h-4 w-4" />
                Instalar
              </Button>
              <Button variant="ghost" size="md" onClick={handleDismiss}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Update Available Banner
export function PWAUpdateBanner() {
  const { hasUpdate, update } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  const handleUpdate = async () => {
    await update();
    setDismissed(true);
  };

  if (!hasUpdate || dismissed) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md"
    >
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <RefreshCw className="h-4 w-4 text-white" />
          </div>

          <div className="flex-1">
            <Text className="font-medium text-foreground">Nova versão disponível</Text>
            <Text size="sm" tone="muted" className="mb-2">
              Atualize para ter acesso às últimas melhorias
            </Text>

            <div className="flex gap-2">
              <Button size="md" onClick={handleUpdate}>
                Atualizar
              </Button>
              <Button variant="ghost" size="md" onClick={() => setDismissed(true)}>
                Depois
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// PWA Status Widget
export function PWAStatus() {
  const {
    isInstalled,
    isOnline,
    notificationsEnabled,
    cacheStatus,
    networkStatus,
    features
  } = usePWA();

  return (
    <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Smartphone className="h-5 w-5 text-foreground" />
        <Text className="font-medium">Status PWA</Text>
      </div>

      <div className="space-y-2">
        {/* Installation Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Instalado</span>
          <div className="flex items-center gap-1">
            {isInstalled ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <X className="h-4 w-4 text-gray-600" />
            )}
          </div>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Conexão</span>
          <div className="flex items-center gap-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <span className="text-xs text-muted">
              {networkStatus.speed}
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Notificações</span>
          <div className="flex items-center gap-1">
            {notificationsEnabled ? (
              <Bell className="h-4 w-4 text-green-600" />
            ) : (
              <X className="h-4 w-4 text-gray-600" />
            )}
          </div>
        </div>

        {/* Cache Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Cache</span>
          <div className="flex items-center gap-1">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-muted">
              {cacheStatus.entries} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Full PWA Manager Dashboard
export function PWAManager() {
  const {
    features,
    clearCache,
    checkForUpdates,
    cacheStatus,
    networkStatus,
    isOnline,
    lastUpdate
  } = usePWA();

  const [isClearing, setIsClearing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    await clearCache();
    setTimeout(() => setIsClearing(false), 1000);
  };

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    await checkForUpdates();
    setTimeout(() => setIsChecking(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Zap className="h-6 w-6 text-foreground" />
        <div>
          <Heading as="h2" size="display-md">Gerenciador PWA</Heading>
          <Text tone="muted" size="sm">
            Configure funcionalidades de Progressive Web App
          </Text>
        </div>
      </div>

      {/* Network Status */}
      <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <Text className="font-medium">Status da Rede</Text>
          <div className={`flex items-center gap-2 ${isOnline ? "text-green-600" : "text-red-600"}`}>
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        {isOnline && (
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Tipo:</span>
              <span>{networkStatus.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Velocidade:</span>
              <span className="capitalize">{networkStatus.speed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Latência:</span>
              <span>{networkStatus.latency}ms</span>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3">
        <Text className="font-medium">Funcionalidades</Text>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex items-center gap-3 rounded-lg border border-foreground/20 bg-surface/30 p-4"
              >
                <Icon className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <Text className="font-medium">{feature.name}</Text>
                  <Text size="sm" tone="muted">{feature.description}</Text>
                </div>
                {feature.enabled && (
                  <Button
                    size="md"
                    variant="outline"
                    onClick={feature.action}
                  >
                    {feature.id === "notifications" ? "Configurar" : "Usar"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cache Management */}
      <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <Text className="font-medium">Gerenciar Cache</Text>
          <div className="flex gap-2">
            <Button
              size="md"
              variant="outline"
              onClick={handleCheckUpdates}
              disabled={isChecking}
              className="gap-2"
            >
              {isChecking ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Verificar
            </Button>
            <Button
              size="md"
              variant="outline"
              onClick={handleClearCache}
              disabled={isClearing}
              className="gap-2"
            >
              {isClearing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Database className="h-4 w-4" />
                </motion.div>
              ) : (
                <Database className="h-4 w-4" />
              )}
              Limpar
            </Button>
          </div>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Entradas:</span>
            <span>{cacheStatus.entries}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Status:</span>
            <span className={`capitalize ${
              cacheStatus.status === "healthy" ? "text-green-600" :
              cacheStatus.status === "stale" ? "text-yellow-600" : "text-red-600"
            }`}>
              {cacheStatus.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Última atualização:</span>
            <span>{new Date(cacheStatus.lastUpdated).toLocaleTimeString("pt-BR")}</span>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
        <Text className="font-medium mb-3">Informações do App</Text>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Versão:</span>
            <span>2.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Última atualização:</span>
            <span>{lastUpdate ? new Date(lastUpdate).toLocaleDateString("pt-BR") : "Nunca"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Service Worker:</span>
            <span className="text-green-600">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}