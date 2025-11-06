// import React from "react";
import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import ProductsList from "./ProductsList";
import { FaThLarge } from "react-icons/fa";
import { MdTableChart } from "react-icons/md";
import ProductsTable from "./ProductsTable";
import DeleteConfirmation from "./DeleteConfirmation";

const Products = () => {
  const [view, setView] = useState<"table" | "cards">("table");
  const [targetProductId, setTargetProductId] = useState<string | null>(null);

  const handleView = () => {
    setView((prev) => (prev === "table" ? "cards" : "table"));
  };

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
          <button
            className={`cursor-pointer border border-gray-300 p-1 text-primary rounded-md hover:text-accentA duration-150`}
            onClick={handleView}
          >
            {view === "table" ? (
              <MdTableChart size={23} />
            ) : (
              <FaThLarge size={23} />
            )}
          </button>
        </div>
        {view === "table" ? (
          <ProductsTable onClick={handleDeleteConfirmation} />
        ) : (
          <ProductsList onClick={handleDeleteConfirmation} />
        )}
      </section>

      <DeleteConfirmation
        productId={targetProductId}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default Products;
