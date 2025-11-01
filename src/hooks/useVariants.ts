import { getVariants, supabase } from "@/supabase";
import { updateVariant } from "@/supabase/db/products";
import type { VariantsTableType } from "@/supabase/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useVariants = () => {
  return useQuery({
    queryKey: ["variants"],
    queryFn: () => getVariants(),
    staleTime: 3 * 1000 * 60, // 3 minutes
  });
};

export const useGetVariantById = (id: string) => {
  return useQuery({
    queryKey: ["variant", id],
    queryFn: () => {
      async (id: string): Promise<VariantsTableType> => {
        try {
          if (!id) {
            throw new Error("Variant ID is required");
          }

          const { data, error } = await supabase
            .from("product_variants")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            console.error("Failed to get product variant:", error.message);
            throw error;
          }
          return data;
        } catch (err) {
          console.error("Failed to get product variant:", err);
          throw err;
        }
      };
    },
  });
};

type TMutationProps = {
  id: string;
  stock: number;
};
export const useUpdateVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }: TMutationProps) => updateVariant(id, stock),
    onSuccess: (data) => {
      // Invalidate/update the cache
      queryClient.invalidateQueries({
        queryKey: ["variant", data.id],
      });
      queryClient.invalidateQueries({ queryKey: ["variants"] });
    },
  });
};
