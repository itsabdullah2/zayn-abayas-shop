import { lazy } from "react";

const AdminDashboard = lazy(
  () => import("@/components/features/dash/AdminDashboard")
);

const AdminDashboardPage = () => {
  return (
    <div className="flex-1 bg-light-gray">
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
