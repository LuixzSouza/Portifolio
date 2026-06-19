"use client";

import { Loader2 } from "lucide-react";
import { AdminProvider, useAdmin } from "./AdminProvider";
import { AdminToastProvider } from "./Toast";
import { LoginForm } from "./LoginForm";
import { AdminShell } from "./AdminShell";
import { BrandMark } from "@/components/layout/BrandMark";
import { TransitionProvider } from "@/components/ds/TransitionProvider";

function AdminGate() {
  const { user, loading } = useAdmin();
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <BrandMark className="text-2xl text-foreground/40" />
        <span className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando painel…
        </span>
      </div>
    );
  }
  return user ? <AdminShell /> : <LoginForm />;
}

/** App do painel: overlay full-screen que cobre o header público do site. */
export function AdminApp() {
  return (
    <AdminProvider>
      <AdminToastProvider>
        <TransitionProvider>
          <div className="fixed inset-0 z-[55] overflow-y-auto bg-background text-foreground">
            <AdminGate />
          </div>
        </TransitionProvider>
      </AdminToastProvider>
    </AdminProvider>
  );
}
