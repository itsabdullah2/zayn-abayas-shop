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

export const getColorById = (colorId: string) => {
  return useQuery({
    queryKey: ["target-color", colorId],
    queryFn: async () => {
      if (!colorId) {
        throw new Error("Color ID is required");
      }

      const { data, error } = await supabase
        .from("colors")
        .select("*")
        .single();

      if (error) {
        console.error("Failed to get the color:", error.message);
        throw error;
      }

      return data;
    },
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

export const getSizeById = (sizeId: string) => {
  return useQuery({
    queryKey: ["target-size", sizeId],
    queryFn: async () => {
      if (!sizeId) {
        throw new Error("Size ID is required");
      }

      const { data, error } = await supabase.from("sizes").select("*").single();

      if (error) {
        console.error("Failed to get the size:", error.message);
        throw error;
      }

      return data;
    },
  });
};

type TVariantsVM = {
  id: string;
  stock: number;
  price: number;
  colors: { id: string; name: string; is_available: boolean };
  sizes: { id: string; name: string; is_available: boolean };
  isLowStock: boolean;
  isOutOfStock: boolean;
};

export const useGetProductVariantsViewModel = (productId: string) => {
  return useQuery({
    queryKey: ["variantsVM", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const { data, error } = await supabase
        .from("product_variants")
        .select(
          `
          id,
          stock,
          price,
          colors:color_id (
            id,
            name,
            is_available
          ),
          sizes:size_id (
            id,
            name,
            is_available
          )`,
        )
        .eq("product_id", productId);

      if (error) {
        console.error("Failed to fetch product variants VM:", error.message);
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        throw new Error("No product variants found for the given product ID");
      }

      const variants: TVariantsVM[] = data.map((v) => ({
        id: v.id,
        stock: v.stock,
        price: v.price,
        colors: v.colors[0], // Fix this later
        sizes: v.sizes[0], // Fix this later
        isLowStock: v.stock > 0 && v.stock <= 5,
        isOutOfStock: v.stock === 0,
      }));

      return variants;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
