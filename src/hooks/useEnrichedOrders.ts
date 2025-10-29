import { getAllOrders } from "@/supabase/db/orders";
import type { FullOrder } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

export const useEnrichedProducts = (limit: number, page: number = 1) => {
  const offset = (page - 1) * limit;

  return useQuery<FullOrder[]>({
    queryKey: ["enrichedOrders", page, offset],
    queryFn: () => getAllOrders(limit, offset),
    staleTime: 1000 * 60 * 5,
  });
};
