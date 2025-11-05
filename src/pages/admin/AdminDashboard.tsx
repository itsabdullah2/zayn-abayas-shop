import { AdminSidebar } from "@/.";
import { SidebarContext } from "@/context/SidebarContext";
import { lazy } from "react";
import { useContextSelector } from "use-context-selector";

const AdminDashboard = lazy(
  () => import("@/components/features/dash/dashboard/AdminDashboard")
);

const AdminDashboardPage = () => {
  const isOpen = useContextSelector(SidebarContext, (ctx) => ctx?.isOpen);
  return (
    <div className="flex-1 bg-light-gray flex">
      <AdminSidebar className="fixed! right-0 top-0 h-dvh hidden" />
      <div
        className={`flex-1 ${isOpen ? "sm:mr-64" : "sm:mr-16"} duration-200`}
      >
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
