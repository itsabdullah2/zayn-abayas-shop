import { supabase } from "../";
import type { ProductType } from "@/types";

type ProductOpts = {
  limit?: number;
  eqCol?: string;
  eqVal?: string;
};

export const getProducts = async (
  options: ProductOpts = {}
): Promise<ProductType[]> => {
  try {
    const { limit, eqCol, eqVal } = options;

    let query = supabase.from("products").select("*");

    if (limit) query = query.limit(limit);
    if (eqVal && eqCol) query = query.eq(eqCol, eqVal);

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Products Found :(");

    return data;
  } catch (err) {
    console.error("Failed to get products:", err);
    throw err;
  }
};
