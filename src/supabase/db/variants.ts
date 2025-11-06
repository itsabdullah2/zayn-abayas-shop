import { supabase } from "../";
import type { ColorsAndSizesType, VariantsTableType } from "../types";

type VariantsOpts = {
  productId?: string;
  inCol?: string;
  inVal?: string[];
};

export const getVariants = async (
  options: VariantsOpts = {}
): Promise<VariantsTableType[]> => {
  try {
    const { productId, inCol, inVal } = options;
    let query = supabase.from("product_variants").select("*");

    if (productId) {
      query = query.eq("product_id", productId);
    }
    if (inCol && inVal) {
      query = query.in(inCol, inVal);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get variants ${err}`);
    throw err;
  }
};

export const updateVariant = async (
  id: string,
  stock: number
): Promise<VariantsTableType> => {
  try {
    if (!id) {
      throw new Error("Product Id is required");
    }
    if (stock === undefined || stock === null) {
      throw new Error("The updated stock is required");
    }

    const { data, error } = await supabase
      .from("product_variants")
      .update({ stock })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update the variant:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`Failed to update the variant ${err}`);
    throw err;
  }
};

export const deleteVariants = async (productId: string) => {
  try {
    if (!productId) {
      console.error("Product ID is required to delete its variants");
      return;
    }

    const { error } = await supabase
      .from("product_variants")
      .delete()
      .eq("product_id", productId);

    if (error) {
      console.error("Failed to delete the target variants:", error.message);
      throw error;
    }
  } catch (err) {
    console.error("Failed to delete the target variants:", err);
    throw err;
  }
};

export const getColors = async (
  colorId: string = ""
): Promise<ColorsAndSizesType[]> => {
  try {
    let query = supabase.from("colors").select("*");

    if (colorId) {
      query = query.eq("id", colorId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get colors ${err}`);
    throw err;
  }
};

export const getSizes = async (
  sizeId: string = ""
): Promise<ColorsAndSizesType[]> => {
  try {
    let query = supabase.from("sizes").select("*");

    if (sizeId) {
      query = query.eq("id", sizeId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get sizes ${err}`);
    throw err;
  }
};
