import type { ProductType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { searchProducts } from "@/supabase/db/search";

type SearchState = {
  products: ProductType[];
  suggestions: string[];
  loading: boolean;
  error: string | null;
  hasSearched?: boolean;
};

type SearchOptions = {
  query: string;
  category?: string;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "created_at";
  useFuzzy?: boolean;
};

const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    products: [],
    suggestions: [],
    loading: false,
    error: null,
    hasSearched: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const searchProductsHandler = useCallback(async (options: SearchOptions) => {
    const { query, ...otherOptions } = options;

    if (!query.trim()) {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        loading: false,
        error: null,
        hasSearched: false,
      }));
      return;
    }

    setSearchState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const searchFunction = searchProducts;
      const products = await searchFunction({ query, ...otherOptions });

      setSearchState((prev) => ({
        ...prev,
        products,
        loading: false,
        error: null,
        hasSearched: true,
      }));
    } catch (err) {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        loading: false,
        error: err instanceof Error ? err.message : "البحث فشل",
        hasSearched: false,
      }));
    }
  }, []);

  // Clear search result
  const clearSearch = useCallback(() => {
    setSearchState({
      products: [],
      suggestions: [],
      loading: false,
      error: null,
      hasSearched: false,
    });
    setSearchQuery("");
  }, []);

  // Auto-search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      searchProductsHandler({ query: debouncedQuery });
    } else {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        hasSearched: false,
      }));
    }
  }, [debouncedQuery, searchProductsHandler]);

  return {
    // State
    products: searchState.products,
    suggestions: searchState.suggestions,
    loading: searchState.loading,
    error: searchState.error,
    hasSearched: searchState.hasSearched,
    searchQuery,
    // Actions
    searchProducts: searchProductsHandler,
    setSearchQuery,
    clearSearch,
  };
};

export default useSearch;
