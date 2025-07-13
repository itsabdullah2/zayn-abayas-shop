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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
            className="odd:bg-light-gray/50 even:bg-light-gray py-4 px-2 rounded-lg h-fit"
          >
            <Link
              to={`/products/${p.id}`}
              className="flex flex-col hover:opacity-80 transition-opacity"
              onClick={onResultClick}
            >
              <h3 className="font-medium text-black">{p.product_name}</h3>
              <p className="text-gray text-sm">
                {p.product_desc || "No description available"}
              </p>
              {p.product_price && (
                <p className="text-primary font-semibold mt-1">
                  ${p.product_price}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(SearchResults);
