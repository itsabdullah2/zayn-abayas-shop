import { AdminSidebar } from "@/.";
import { lazy } from "react";

const Orders = lazy(() => import("@/components/features/dash/Orders"));

const AdminOrdersPage = () => {
  return (
    <div className="flex-1 bg-light-gray flex">
      <AdminSidebar />
      <div className="flex-1">
        <Orders />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
