import { getCategories, getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import FilterBar from "./FilterBar";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import type { CategoriesTableType } from "@/supabase/types";

const AllCategories = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoriesTableType[]>([]);
  const selectedCategory = useContextSelector(
    AppContext,
    (ctx) => ctx?.selectedCategory
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (err) {
        console.error("Failed to Fetch Categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;

    const fetchProducts = async () => {
      try {
        if (selectedCategory === "all") {
          const result = await getProducts();
          setData(result);
        } else {
          const selected = categories.find(
            (cat) =>
              cat.category.trim().toLocaleLowerCase() ===
              selectedCategory?.trim().toLocaleLowerCase()
          );

          if (selected) {
            const result = await getProducts({
              eqCol: "category_id",
              eqVal: selected.id,
            });
            setData(result);
          } else {
            setData([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch the products");
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, categories]);

  return (
    <section className="section-container flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-primary font-bold text-2xl">All Categories</h1>

        <FilterBar />
      </div>

      {isLoading ? (
        <p>Products Loading...</p>
      ) : data.length === 0 ? (
        <p>not products found</p>
      ) : (
        <ProductsList products={data} />
      )}
    </section>
  );
};

export default AllCategories;
