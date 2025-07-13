import React, { useRef } from "react";
import { Input } from "@/components/ui/input";

type SearchHookType = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchProducts: (params: { query: string }) => void;
  loading?: boolean;
};

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  searchProducts,
  loading,
}: SearchHookType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts({ query: searchQuery });
    }
  };

  return (
    <Input
      ref={inputRef}
      type="search"
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={loading}
      placeholder="Search..."
      className="w-full border border-gray rounded-lg h-11 bg-light-gray focus:placeholder:opacity-0 placeholder:duration-200 focus:outline-none mt-5 focus-visible:ring-none focus:border-none"
      aria-label="Search products"
      autoFocus
    />
  );
};

export default React.memo(SearchInput);
