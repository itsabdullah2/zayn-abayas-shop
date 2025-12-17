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

export const addNewCategory = async (
  category: string
): Promise<CategoriesTableType> => {
  try {
    if (!category.trim()) throw new Error("Category cannot be empty");

    const { data, error } = await supabase
      .from("categories")
      .insert({ category })
      .select()
      .single();

    if (error) {
      console.error("Failed to add new category:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to add new category:", err);
    throw err;
  }
};
