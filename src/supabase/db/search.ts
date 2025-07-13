import type { ProductType } from "@/types";
import { supabase } from "../";

type SearchOptions = {
  query: string;
  category?: string;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "created_at";
};

export const searchProducts = async (
  options: SearchOptions
): Promise<ProductType[]> => {
  try {
    const { query, category, limit = 20, sortBy = "name_asc" } = options;

    if (!query.trim()) {
      throw new Error("Search query is required");
    }

    let searchQuery = supabase
      .from("products")
      .select("*")
      .or(`product_name.ilike.%${query}%,product_desc.ilike.%${query}%`);

    // Filter by category if provided
    if (category) {
      searchQuery = searchQuery.eq("category_id", category);
    }

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        searchQuery = searchQuery.order("product_price", { ascending: true });
        break;
      case "price_desc":
        searchQuery = searchQuery.order("product_price", { ascending: false });
        break;
      case "name_asc":
        searchQuery = searchQuery.order("product_name", { ascending: true });
        break;
      case "name_desc":
        searchQuery = searchQuery.order("product_name", { ascending: false });
        break;
      case "created_at":
        searchQuery = searchQuery.order("created_at", { ascending: true });
        break;
      default:
        searchQuery = searchQuery.order("product_name", { ascending: true });
    }

    // Apply limit
    if (limit) {
      searchQuery = searchQuery.limit(limit);
    }

    const { data, error } = await searchQuery;

    if (error) {
      console.error("Search error:", error);
      throw new Error(error.message);
    }
    if (!data) {
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to search products:", err);
    throw err;
  }
};
