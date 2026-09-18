import AdminShell from "@/features/admin/components/AdminShell";
import InteractionLayer from "@/components/dashboard/InteractionLayer";

export const metadata = {
  title: "Admin Dashboard | Uomo",
  description: "Uomo commerce administration dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <InteractionLayer mode="admin">
      <AdminShell>{children}</AdminShell>
    </InteractionLayer>
  );
}
