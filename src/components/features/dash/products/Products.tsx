import React from "react";
import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import ProductsList from "./ProductsList";
import { Button } from "@/components/ui/button";
import { useAddNewProduct } from "@/hooks/useProducts";
const AddNewProduct = React.lazy(() => import("./AddNewProduct"));
const EditPopupForm = React.lazy(() => import("./EditPopupForm"));
const DeleteConfirmation = React.lazy(() => import("./DeleteConfirmation"));

const Products = () => {
  const [targetProductId, setTargetProductId] = useState<string | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const addNewProductMutation = useAddNewProduct();

  const handleDeleteConfirmation = (productId: string) => {
    if (productId) {
      setTargetProductId(productId);
    }
  };

  const handleDeleteCancel = () => {
    setTargetProductId(null);
  };

  const handleSubmitNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (addNewProductMutation.isPending) return;

    try {
      // Handle new product submission logic here
      await addNewProductMutation.mutateAsync();
      setIsNewProduct(false);
    } catch (err) {
      console.error("Failed to add new product:", err);
    }
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
