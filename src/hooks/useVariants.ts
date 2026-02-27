import { getVariants, supabase } from "@/supabase";
import { updateVariant } from "@/supabase";
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

export const useGetVariantByProductId = (productId: string) => {
  return useQuery({
    queryKey: ["product-variant", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const { data, error } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", productId);
      // .single();

      if (error) {
        console.error("Failed to get product variants", error.message);
        throw error;
      }

      return data;
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

// Get Colors and Sizes for variants options
type TSingleVariant = {
  id: string;
  name: string;
  created_at: Date;
};
export const useColors = () => {
  return useQuery<TSingleVariant[]>({
    queryKey: ["variants-colors"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("colors")
          .select<"*", TSingleVariant>("*");

        if (error) throw new Error(error.message);
        if (!data) throw new Error("No Colors Found!");

        return data || [];
      } catch (err) {
        console.error("Failed to get colors:", err);
        throw err;
      }
    },
    staleTime: 5 * 1000 * 60, // 5 minutes
  });
};

export const useSizes = () => {
  return useQuery<TSingleVariant[]>({
    queryKey: ["variants-sizes"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("sizes")
          .select<"*", TSingleVariant>("*");

        if (error) throw new Error(error.message);
        if (!data) throw new Error("No Sizes Found!");
        return data || [];
      } catch (err) {
        console.error("Failed to get sizes:", err);
        throw err;
      }
    },
    staleTime: 5 * 1000 * 60, // 5 minutes
  });
};
