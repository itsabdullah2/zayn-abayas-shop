import React from "react";
import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import ProductsList from "./ProductsList";
import { Button } from "@/components/ui/button";
const AddNewProduct = React.lazy(() => import("./AddNewProduct"));
const EditPopupForm = React.lazy(() => import("./EditPopupForm"));
const DeleteConfirmation = React.lazy(() => import("./DeleteConfirmation"));

const Products = () => {
  const [targetProductId, setTargetProductId] = useState<string | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const handleDeleteConfirmation = (productId: string) => {
    if (productId) {
      setTargetProductId(productId);
    }
  };

  const handleDeleteCancel = () => {
    setTargetProductId(null);
  };

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle new product submission logic here

    // Close the new product popup after submission
    setIsNewProduct(false);
  };

  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-primary">المنتجات</h2>
          <Button
            className={`w-fit px-4 sm:px-10 bg-transparent border border-primary text-primary hover:bg-primary hover:text-neutral cursor-pointer`}
            onClick={() => setIsNewProduct(true)}
          >
            <span className="text-2xl">+</span>
            إضافة منتج جديد
          </Button>
        </div>
        <ProductsList onClick={handleDeleteConfirmation} />
      </section>

      <DeleteConfirmation
        productId={targetProductId}
        onCancel={handleDeleteCancel}
      />

      <EditPopupForm />
      <AddNewProduct
        isNewProduct={isNewProduct}
        setProductChange={setIsNewProduct}
        onSubmit={handleSubmitNewProduct}
      />
    </>
  );
};

export default Products;
