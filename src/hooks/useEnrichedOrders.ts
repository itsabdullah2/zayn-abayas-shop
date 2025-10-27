import { getAllOrders } from "@/supabase/db/orders";
import type { FullOrder } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

export const useEnrichedProducts = (limit?: number) => {
  return useQuery<FullOrder[]>({
    queryKey: ["enrichedOrders"],
    queryFn: () => getAllOrders(limit),
    staleTime: 1000 * 60 * 5,
  });
};
