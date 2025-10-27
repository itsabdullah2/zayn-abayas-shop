import { getTopProducts } from "@/supabase/db/orders";
import type { TTopProducts } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

export const useTopProducts = () => {
  return useQuery<TTopProducts[]>({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(),
    staleTime: 1000 * 60 * 5,
  });
};
