"use client";

import { AdminProvider } from "./AdminProvider";
import { AdminQuickAccess } from "./AdminQuickAccess";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminProvider>
      {children}
      <AdminQuickAccess />
    </AdminProvider>
  );
}