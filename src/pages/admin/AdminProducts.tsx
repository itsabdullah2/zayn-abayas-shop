import { AdminSidebar } from "@/.";
import { SidebarContext } from "@/context/SidebarContext";
import { lazy } from "react";
import { useContextSelector } from "use-context-selector";

const Products = lazy(
  () => import("@/components/features/dash/products/Products")
);

const AdminProductsPage = () => {
  const isOpen = useContextSelector(SidebarContext, (ctx) => ctx?.isOpen);

  return (
    <div className="flex-1 bg-light-gray flex">
      <AdminSidebar className="fixed! right-0 top-0 h-dvh " />
      <div
        className={`flex-1 ${isOpen ? "sm:mr-64" : "sm:mr-16"} duration-200`}
      >
        <Products />
      </div>
    </div>
  );
};

export default AdminProductsPage;
