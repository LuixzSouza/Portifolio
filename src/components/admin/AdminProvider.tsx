"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, me, type AdminUser } from "@/lib/api";

interface AdminContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaura a sessão (cookie) ao montar; o me() também repõe o token CSRF.
  useEffect(() => {
    let active = true;
    me()
      .then((u) => {
        if (active) setUser(u);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const u = await apiLogin(username, password);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  return (
    <AdminContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin deve ser usado dentro de <AdminProvider>.");
  return ctx;
}
