import type { Order, OrderItem, VariantsTableType } from "@/supabase/types";
import type { ProductType } from "@/types";
import { calculateSoldProducts } from "@/utils/calculateSoldProducts";
import { useMemo } from "react";

type EnrichedProduct = ProductType & {
  //   price?: number;
  stock: number;
};

export function useSoldProducts(
  products: EnrichedProduct[],
  orders: Order[],
  orderItems: OrderItem[],
  variants: VariantsTableType[],
) {
  return useMemo(() => {
    if (
      !products?.length ||
      // !orders?.length ||
      // !orderItems?.length ||
      !variants?.length
    )
      return [];

    return calculateSoldProducts(products, orders, orderItems, variants);
  }, [products, orders, orderItems, variants]);
}
