import { useShowProducts } from "@/hooks/useProducts";
import ProductListItem from "./ProductListItem";
import { useEnrichedProducts } from "@/hooks/useEnrichedProducts";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { useSoldProducts } from "@/hooks/useSoldProducts";
import useOrders from "@/hooks/useOrders";
import useOrderItems from "@/hooks/useOrderItems";

const ProductsList = () => {
  const { data: products = [] } = useShowProducts();
  const { data: enrichedProducts = [], isLoading } = useEnrichedProducts({
    products,
  });
  const { data: orders = [] } = useOrders();
  const { orderItemsData } = useOrderItems();
  const soldProducts = useSoldProducts(
    enrichedProducts,
    orders,
    orderItemsData
  );

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
    <div className="responsive-grid mt-8 items-stretch">
      {enrichedProducts.map((product, i) => (
        <ProductListItem
          key={product.id}
          idx={i}
          product={product}
          soldProducts={soldProducts}
        />
      ))}
    </div>
  );
};

export default ProductsList;
