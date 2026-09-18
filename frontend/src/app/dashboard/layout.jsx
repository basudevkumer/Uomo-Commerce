import DashboardLayout from "@/features/dashboard/components/rootDashboard/DashboardLayout";
import InteractionLayer from "@/components/dashboard/InteractionLayer";
export default function Layout({ children }) {
  return (
    <InteractionLayer>
      <DashboardLayout>{children}</DashboardLayout>
    </InteractionLayer>
  );
}
