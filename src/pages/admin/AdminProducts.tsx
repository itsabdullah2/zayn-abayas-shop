import { AdminSidebar } from "@/.";
import { lazy } from "react";

const Products = lazy(
  () => import("@/components/features/dash/products/Products")
);

const AdminProductsPage = () => {
  return (
    <div className="flex-1 bg-light-gray flex">
      <AdminSidebar />
      <div className="flex-1">
        <Products />
      </div>
    </div>
  );
};

export default AdminProductsPage;
