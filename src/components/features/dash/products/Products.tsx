import React from "react";
import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import ProductsList from "./ProductsList";
import { Button } from "@/components/ui/button";
const EditPopupForm = React.lazy(() => import("./EditPopupForm"));
const DeleteConfirmation = React.lazy(() => import("./DeleteConfirmation"));

const Products = () => {
  const [targetProductId, setTargetProductId] = useState<string | null>(null);

  const handleDeleteConfirmation = (productId: string) => {
    if (productId) {
      setTargetProductId(productId);
    }
  };

  const handleDeleteCancel = () => {
    setTargetProductId(null);
  };

  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-primary">المنتجات</h2>
          <Button
            className={`w-fit px-4 sm:px-10 bg-transparent border border-primary text-primary hover:bg-primary hover:text-neutral cursor-pointer`}
          >
            + إضافة منتج
          </Button>
        </div>
        <ProductsList onClick={handleDeleteConfirmation} />
      </section>

      <DeleteConfirmation
        productId={targetProductId}
        onCancel={handleDeleteCancel}
      />

      <EditPopupForm />
    </>
  );
};

export default Products;
