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

export const deleteProduct = async () => {};
