import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  onDebounceSearch?: (searchTerm: string) => string;
}

const SearchInput = ({ onDebounceSearch }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    // Only trigger the callback if it's provided & the debounced term isn't null/undefined
    if (
      onDebounceSearch &&
      debouncedSearchTerm !== undefined &&
      debouncedSearchTerm !== null
    ) {
      onDebounceSearch(debouncedSearchTerm);
    }
  }, [onDebounceSearch, debouncedSearchTerm]);

  return (
    <Input
      type="search"
      value={inputValue}
      onChange={handleChange}
      placeholder="Search..."
      className="w-full border border-gray rounded-lg h-11 bg-light-gray focus:placeholder:opacity-0 placeholder:duration-200 focus:outline-none mt-5 focus-visible:ring-none"
    />
  );
};

export default SearchInput;
