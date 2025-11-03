import type { Order, OrderItem } from "@/supabase/types";
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
  orderItems: OrderItem[]
) {
  return useMemo(() => {
    if (!products?.length || !orders?.length || !orderItems?.length) return [];

    return calculateSoldProducts(products, orders, orderItems);
  }, [products, orders, orderItems]);
}
