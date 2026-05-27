import { useAdmin } from "@/components/admin/AdminProvider";

export function useAdminStatus() {
  const { user } = useAdmin();

  return {
    isAdmin: !!user,
    user,
    isLoggedIn: !!user
  };
}