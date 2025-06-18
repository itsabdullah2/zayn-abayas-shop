import { supabase } from "../";
import type { ProductType } from "@/types";

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .overrideTypes<Array<ProductType>, { merge: false }>();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Products Found :(");

    return data;
  } catch (err) {
    console.error("Failed to get products:", err);
    throw err;
  }
};
