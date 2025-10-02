import { AdminSidebar } from "@/.";
import { lazy } from "react";

const AdminDashboard = lazy(
  () => import("@/components/features/dash/AdminDashboard")
);

const AdminDashboardPage = () => {
  return (
    <div className="flex-1 bg-light-gray flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
