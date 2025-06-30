import { getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import FilterBar from "./FilterBar";

const AllCategories = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch the products");
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section-container flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-primary font-bold text-2xl">All Categories</h1>

        <FilterBar />
      </div>

      {isLoading ? (
        <p>Products Loading...</p>
      ) : (
        <ProductsList products={data} />
      )}
    </section>
  );
};

export default AllCategories;
