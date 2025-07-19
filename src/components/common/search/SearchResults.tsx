import type { ProductType } from "@/types";
import React from "react";
import { Link } from "react-router-dom";

type SearchHookType = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  searchQuery: string;
  onResultClick: () => void;
};

const SearchResults = ({
  products,
  loading,
  error,
  hasSearched,
  searchQuery,
  onResultClick,
}: SearchHookType) => {
  if (loading) {
    return (
      <div className="flex-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accentB" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-8">
        <p className="text-gray">Start typing to search for products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray">
          No products found {searchQuery && `for "${searchQuery}"`}
        </p>
      </div>
    );
  }

  return (
    <>
      {products.length > 0 && (
        <div className="-mt-3 text-sm">
          <p className="text-gray">
            Found {products.length} product{products.length !== 1 ? "s" : ""}{" "}
            for "{searchQuery}"
          </p>
        </div>
      )}
      <ul className="flex flex-col gap-3" role="list">
        {products.map((p) => (
          <li
            key={p.id}
            className="odd:bg-light-gray/50 even:bg-light-gray py-3 px-2 rounded-lg h-fit"
          >
            <Link
              to={`/products/${p.id}`}
              className="flex flex-col hover:opacity-80 transition-opacity"
              onClick={onResultClick}
            >
              <h3 className="font-medium text-primary">{p.product_name}</h3>
              <p className="text-text text-sm">
                {p.product_desc.length > 80
                  ? p.product_desc.slice(0, 80) + "..."
                  : p.product_desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(SearchResults);
