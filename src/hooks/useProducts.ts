import { getProducts } from "@/supabase";
import type { CategoriesTableType } from "@/supabase/types";
import type { ProductType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, updateProduct } from "@/supabase";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";

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

export const useShowProducts = () => {
  return useQuery<ProductType[]>({
    queryKey: ["show-products"],
    queryFn: () => getProducts(),
    staleTime: 3 * 1000 * 60, // 3 minute
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const setIsEditPopupForm = useContextSelector(
    AppContext,
    (ctx) => ctx?.setIsEditPopupForm
  );
  const productId = useContextSelector(
    AppContext,
    (ctx) => ctx?.isEditPopupForm
  )!;
  const editingData = useContextSelector(
    AppContext,
    (ctx) => ctx?.editingData
  )!;

  return useMutation({
    mutationFn: async () => {
      let productImgUrl =
        typeof editingData.productImg === "string"
          ? editingData.productImg
          : "";

      // Check if a new file was uploaded
      if (editingData.productImg instanceof File) {
        const file = editingData.productImg;
        const fileName = `${Date.now()}_${file.name}`;

        // Upload to supabase
        const { error: uploadError } = await supabase.storage
          .from("products-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get Public Url
        const { data } = supabase.storage
          .from("products-images")
          .getPublicUrl(fileName);

        productImgUrl = data.publicUrl;
      }

      // Update the product row in DB
      const fields = {
        product_name: editingData.productName,
        product_desc: editingData.productDesc,
        product_price: editingData.productPrice,
        product_img: productImgUrl,
      };

      const updated = await updateProduct(fields, productId);
      return updated;
    },
    onSuccess: (updatedProduct) => {
      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ["show-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // update cached 'show-products' list instantly
      queryClient.setQueryData<ProductType[]>(["show-products"], (old) =>
        old?.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      // Close the popup
      if (setIsEditPopupForm) setIsEditPopupForm(null);
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};
