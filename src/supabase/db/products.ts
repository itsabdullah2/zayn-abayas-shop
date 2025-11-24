import { supabase } from "../";
import type { ProductType } from "@/types";

type ProductOpts = {
  limit?: number;
  eqCol?: string;
  eqVal?: string | boolean;
  inCol?: string;
  inVal?: string[];
};

export const getProducts = async (
  options: ProductOpts = {}
): Promise<ProductType[]> => {
  try {
    const { limit, eqCol, eqVal, inCol, inVal } = options;

    let query = supabase.from("products").select("*");

    if (limit) query = query.limit(limit);
    if (eqVal && eqCol) query = query.eq(eqCol, eqVal);
    if (inCol && inVal) query = query.in(inCol, inVal);

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Products Found :(");

    return data;
  } catch (err) {
    console.error("Failed to get products:", err);
    throw err;
  }
};

export const addProduct = async (productData: Omit<ProductType, "id">) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error("Failed to add product:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    if (!productId) {
      console.error("Product ID is required to delete a product");
      return;
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Failed to delete the target product:", error.message);
      throw error;
    }
  } catch (err) {
    console.error("Failed to delete the target product:", err);
    throw err;
  }
};

type TEditingData = {
  product_name: string;
  product_desc: string;
  product_price: number;
  product_img: string;
};
export const updateProduct = async (
  editedData: TEditingData,
  productId: string
) => {
  try {
    const { product_name, product_desc, product_price, product_img } =
      editedData;

    const updatePayload: Partial<TEditingData> = {};

    if (product_name) updatePayload.product_name = product_name;
    if (product_desc) updatePayload.product_desc = product_desc;
    if (product_price) updatePayload.product_price = product_price;
    if (product_img) updatePayload.product_img = product_img;

    // Remove undefined fields to avoid overwriting
    Object.keys(updatePayload).forEach(
      (key) =>
        updatePayload[key as keyof TEditingData] === undefined &&
        delete updatePayload[key as keyof TEditingData]
    );

    const { data, error } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", productId)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to update the product:", err);
    throw err;
  }
};
