import ProductsList from "./ProductsList";
import FilterBar from "./FilterBar";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useEnrichedProducts } from "@/hooks/useEnrichedProducts";

const Shop = () => {
  const selectedCategory = useContextSelector(
    AppContext,
    (ctx) => ctx?.selectedCategory
  )!;

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts({
    selectedCategory,
    categories,
  });
  const { data: enrichedProducts = [], isLoading: enrichedLoading } =
    useEnrichedProducts({
      products,
      enabled: !productsLoading,
    });

  const isLoading = categoriesLoading || productsLoading || enrichedLoading;

  return (
    <section className="section-container flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-primary font-bold text-2xl">جميع الأقسام</h1>

        <FilterBar />
      </div>

      {isLoading ? (
        <p>جارٍ تحميل المنتجات...</p>
      ) : enrichedProducts.length === 0 ? (
        <p>لم يتم العثور على منتجات</p>
      ) : (
        <ProductsList products={enrichedProducts} />
      )}
    </section>
  );
};

export default Shop;
