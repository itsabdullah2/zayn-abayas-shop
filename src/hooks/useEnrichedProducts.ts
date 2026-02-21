import { getVariants } from "@/supabase";
import type { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type EnrichedProductType = ProductType & {
  enrichedVariants: { id: string; stock: number; price: number }[];
};

interface UseEnrichedProductsProps {
  products: ProductType[];
  enabled?: boolean;
}

export const useEnrichedProducts = ({
  products,
  enabled,
}: UseEnrichedProductsProps) => {
  return useQuery({
    queryKey: ["enriched-products", products?.map((p) => p.id)],
    queryFn: async (): Promise<EnrichedProductType[]> => {
      return await Promise.all(
        products.map(async (product) => {
          try {
            // Fetch and attach minimal variant data (id, stock, price) to product
            const variants = await getVariants({ productId: product.id });
            const enriched = variants.map((v) => ({
              id: v.id,
              stock: v.stock,
              price: v.price,
            }));
            return { ...product, enrichedVariants: enriched };
          } catch (err) {
            return { ...product, enrichedVariants: [] };
          }
        }),
      );
    },
    enabled: enabled && products.length > 0,
    staleTime: 2 * 60 * 1000,
  });
};
