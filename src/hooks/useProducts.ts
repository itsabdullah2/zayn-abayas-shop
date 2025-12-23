import {
  // addVariants,
  deleteProduct,
  deleteVariants,
  getProducts,
} from "@/supabase";
import type { CategoriesTableType } from "@/supabase/types";
import type { ProductType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  supabase,
  updateProduct,
  // addProduct
} from "@/supabase";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { ProductContext } from "@/context/ProductContext";

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
  const session = useContextSelector(AuthContext, (ctx) => ctx?.session);
  return useQuery<ProductType[]>({
    queryKey: ["show-products"],
    queryFn: () => getProducts(),
    staleTime: 3 * 1000 * 60, // 3 minute
    enabled: !!session,
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
      toast.success("تم تعديل المنتج بنجاح");
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};

type TProductData = {
  productName: string;
  productDesc: string;
  productPrice: number;
  productImg: File | string;
  categoryId: string;
  variants: {
    sizes: string[];
    colors: string[];
  };
  // productStock: number;
};

type TVariantsState = { color_id: string; size_id: string; stock: number };

export const useAddNewProduct = () => {
  const queryClient = useQueryClient();
  const resetProductData = useContextSelector(
    ProductContext,
    (ctx) => ctx?.resetProductData
  )!;

  return useMutation({
    mutationFn: async ({
      newProductData,
      variants,
    }: {
      newProductData: TProductData;
      variants: TVariantsState[];
    }) => {
      // Validation
      if (!newProductData) {
        throw new Error("New product data is missing");
      }

      let productImgUrl = "";

      // Upload image if it's a File
      if (newProductData.productImg instanceof File) {
        try {
          productImgUrl = await uploadProductImage(newProductData.productImg);
        } catch (err) {
          console.error("Image upload failed:", err);
          throw new Error("Failed to upload product image");
        }
      } else if (typeof newProductData.productImg === "string") {
        productImgUrl = newProductData.productImg;
      }

      // Insert new product to DB
      const productData = {
        product_name: newProductData.productName,
        product_desc: newProductData.productDesc,
        product_price: newProductData.productPrice,
        product_img: productImgUrl,
        category_id: newProductData.categoryId,
      };
      // const data = await addProduct(productData);

      // if (!data?.id) {
      //   throw new Error("Failed to get product ID after insertion");
      // }

      // Insert new variant - wrap in a array to match updated addVariants signature
      // const variants = await addVariants([
      //   {
      //     product_id: data?.id,
      //     size_id: newProductData.variants.sizes,
      //     color_id: newProductData.variants.colors,
      //     price: newProductData.productPrice,
      //     stock: newProductData.productStock,
      //   },
      // ]);

      // TESTING: Log the added product data and variants
      console.log("Added product:", productData);
      console.log("Added variants:", variants);

      // return { data, variants };
    },
    onSuccess: () => {
      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ["show-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["variants-colors"] });
      queryClient.invalidateQueries({ queryKey: ["variants-sizes"] });
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({ queryKey: ["enriched-products"] });

      toast.success("تم إضافة المنتج الجديد بنجاح");
      // Reset new product data
      resetProductData();
    },
    onError: (error) => {
      console.error("Failed to add new product:", error);
      toast.error("فشل في إضافة المنتج الجديد");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      await deleteProduct(productId);
      await deleteVariants(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["show-products"] });
      // queryClient.invalidateQueries({queryKey: ["enriched-products"]})
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
      toast.error("فشل في حذف المنتج");
    },
  });
};

const uploadProductImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;

  // Upload to supabase
  const { error: uploadError } = await supabase.storage
    .from("products-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get Public Url
  const { data: urlData } = supabase.storage
    .from("products-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
