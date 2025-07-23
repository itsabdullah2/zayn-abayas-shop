import {
  getCategories,
  getProducts,
  getVariants,
} from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import FilterBar from "./FilterBar";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import type { CategoriesTableType } from "@/supabase/types";

type EnrichedProductType = ProductType & {
  price?: number;
};

const Shop = () => {
  const [data, setData] = useState<EnrichedProductType[]>([]);
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
        let products = [];

        if (selectedCategory === "all") {
          products = await getProducts();
        } else {
          const selected = categories.find(
            (cat) =>
              cat.category.trim().toLocaleLowerCase() ===
              selectedCategory?.trim().toLocaleLowerCase()
          );

          if (selected) {
            products = await getProducts({
              eqCol: "category_id",
              eqVal: selected.id,
            });
          } else {
            setData([]);
            return;
          }
        }

        // Enrich products with their first variant's price
        const enriched: EnrichedProductType[] = await Promise.all(
          products.map(async (product) => {
            try {
              const variants = await getVariants({ productId: product.id });
              const price = variants[0]?.price;

              return { ...product, price };
            } catch (err) {
              return { ...product };
            }
          })
        );
        setData(enriched);
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
        <h1 className="text-primary font-bold text-2xl">جميع الأقسام</h1>

        <FilterBar />
      </div>

      {isLoading ? (
        <p>جارٍ تحميل المنتجات...</p>
      ) : data.length === 0 ? (
        <p>لم يتم العثور على منتجات</p>
      ) : (
        <ProductsList products={data} />
      )}
    </section>
  );
};

export default Shop;
