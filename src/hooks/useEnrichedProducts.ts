import { getVariants } from "@/supabase";
import type { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type EnrichedProductType = ProductType & {
  price?: number;
  stock: number;
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
            const variants = await getVariants({ productId: product.id });
            const { price, stock } = variants[0];
            return { ...product, price, stock };
          } catch (err) {
            return { ...product, stock: 0 };
          }
        })
      );
    },
    enabled: enabled && products.length > 0,
    staleTime: 2 * 60 * 1000,
  });
};
