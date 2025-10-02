import { lazy } from "react";

const Orders = lazy(() => import("@/components/features/dash/Orders"));

const AdminOrdersPage = () => {
  return (
    <div className="flex-1 bg-light-gray">
      <Orders />
    </div>
  );
};

export default AdminOrdersPage;
