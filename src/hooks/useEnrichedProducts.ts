import { getVariants } from "@/supabase";
import type { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type EnrichedProductType = ProductType & {
  price?: number;
};

interface UseEnrichedProductsProps {
  products: ProductType[];
  enabled: boolean;
}

export const useEnrichedProducts = ({
  products,
  enabled,
}: UseEnrichedProductsProps) => {
  return useQuery({
    queryKey: ["enriched-products", products.map((p) => p.id)],
    queryFn: async (): Promise<EnrichedProductType[]> => {
      return await Promise.all(
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
    },
    enabled: enabled && products.length > 0,
    staleTime: 2 * 60 * 1000,
  });
};
