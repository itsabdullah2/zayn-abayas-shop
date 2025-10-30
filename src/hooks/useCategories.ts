import { getCategories } from "@/supabase/db/products";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
