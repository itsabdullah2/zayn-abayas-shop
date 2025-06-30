import { useState } from "react";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleActiveFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="border border-gray rounded-xl py-2 px-3 flex items-center gap-3 w-full sm:w-fit">
      <button
        className={`filter-btn ${
          activeFilter === "all" ? "text-primary bg-light-gray" : "text-accentA"
        }`}
        onClick={() => handleActiveFilter("all")}
      >
        All
      </button>
      <button
        className={`filter-btn ${
          activeFilter === "classic"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleActiveFilter("classic")}
      >
        Classic
      </button>
      <button
        className={`filter-btn ${
          activeFilter === "modern"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleActiveFilter("modern")}
      >
        Modern
      </button>
      <button
        className={`filter-btn ${
          activeFilter === "luxury"
            ? "text-primary bg-light-gray"
            : "text-accentA"
        }`}
        onClick={() => handleActiveFilter("luxury")}
      >
        Luxury
      </button>
    </div>
  );
};

export default FilterBar;
