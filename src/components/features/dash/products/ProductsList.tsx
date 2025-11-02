import { useShowProducts } from "@/hooks/useProducts";
import ProductListItem from "./ProductListItem";
import { useEnrichedProducts } from "@/hooks/useEnrichedProducts";
import { SkeletonCard } from "@/components/common/SkeletonCard";

const ProductsList = () => {
  const { data: products = [] } = useShowProducts();
  const { data: enrichedProducts = [], isLoading } = useEnrichedProducts({
    products,
  });
  console.log("Enriched Products Data:", enrichedProducts);

  console.log("Products Data:", products);

  if (isLoading) {
    return (
      <div className="responsive-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <ProductListItem products={enrichedProducts} />
    </>
  );
};

export default ProductsList;
