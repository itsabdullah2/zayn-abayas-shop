import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useContextSelector } from "use-context-selector";
import SearchInput from "./SearchInput";
import { useEffect, useRef } from "react";
import SearchResults from "./SearchResults";
import useSearch from "@/hooks/useSearch";

const SearchPopup = () => {
  const searchHook = useSearch();
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleCloseSearchPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleCloseSearchPopup
  )!;

  useEffect(() => {
    const closePopupOnClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleCloseSearchPopup();
      }
    };

    document.addEventListener("mousedown", closePopupOnClickOutside);
    return () =>
      document.removeEventListener("mousedown", closePopupOnClickOutside);
  }, [handleCloseSearchPopup]);

  return (
    <>
      <div className="fixed bg-black/70 top-0 left-0 w-full h-full z-90" />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 bg-neutral text-primary py-8 px-5 rounded-xl w-[95vw] sm:w-162.5 h-112.5 max-h-150 overflow-y-auto `}
        ref={popupRef}
        role="dialog"
        aria-modal={true}
      >
        <div className="flex flex-col gap-5">
          <SearchInput
            searchQuery={searchHook.searchQuery}
            setSearchQuery={searchHook.setSearchQuery}
            searchProducts={searchHook.searchProducts}
            loading={searchHook.loading}
          />
          <SearchResults
            products={searchHook.products}
            loading={searchHook.loading}
            error={searchHook.error}
            searchQuery={searchHook.searchQuery}
            hasSearched={!!searchHook.hasSearched}
            onResultClick={handleCloseSearchPopup}
          />
        </div>

        <Button
          role="button"
          size="sm"
          className="bg-gray/30 text-primary border border-text absolute top-2 right-5 cursor-pointer hover:bg-light-gray duration-200"
          onClick={handleCloseSearchPopup}
          aria-label="Close search popup"
        >
          Esc
        </Button>
      </div>
    </>
  );
};

export default SearchPopup;
