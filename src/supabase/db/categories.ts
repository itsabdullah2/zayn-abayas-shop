import { supabase } from "../";
import type { CategoriesTableType } from "../types";

export const getCategories = async (): Promise<CategoriesTableType[]> => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Categories Found!");

    return data;
  } catch (err) {
    console.error("Failed to get categories:", err);
    throw err;
  }
};
