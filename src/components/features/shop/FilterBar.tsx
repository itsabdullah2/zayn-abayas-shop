import { AppContext } from "@/context/AppContext";
import { useContextSelector } from "use-context-selector";

const FilterBar = () => {
  const { selectedCategory, handleSelectedCategory } = useContextSelector(
    AppContext,
    (ctx) => ({
      selectedCategory: ctx?.selectedCategory,
      handleSelectedCategory: ctx?.handleSelectedCategory,
    })
  );

  return (
    <div className="border border-gray rounded-xl py-2 px-3 flex items-center gap-3 w-full sm:w-fit">
      <button
        className={`filter-btn ${
          selectedCategory === "all"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleSelectedCategory?.("all")}
      >
        الكل
      </button>
      <button
        className={`filter-btn ${
          selectedCategory === "classic"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleSelectedCategory?.("classic")}
      >
        كلاسيكي
      </button>
      <button
        className={`filter-btn ${
          selectedCategory === "modern"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleSelectedCategory?.("modern")}
      >
        عصري
      </button>
      <button
        className={`filter-btn ${
          selectedCategory === "luxury"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleSelectedCategory?.("luxury")}
      >
        فاخر
      </button>
    </div>
  );
};

export default FilterBar;
