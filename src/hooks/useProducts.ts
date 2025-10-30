import { getProducts } from "@/supabase";
import type { CategoriesTableType } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

interface UseProductProps {
  selectedCategory: string;
  categories: CategoriesTableType[];
}
export const useProducts = ({
  selectedCategory,
  categories,
}: UseProductProps) => {
  return useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      if (selectedCategory === "all") {
        return await getProducts();
      }

      const selected = categories.find(
        (cat) =>
          cat.category.trim().toLocaleLowerCase() ===
          selectedCategory?.trim().toLocaleLowerCase()
      );

      if (selected) {
        return await getProducts({
          eqCol: "category_id",
          eqVal: selected.id,
        });
      }

      return [];
    },
    enabled: categories.length > 0 && !!selectedCategory,
    staleTime: 2 * 60 * 1000, // 5 minutes
  });
};
