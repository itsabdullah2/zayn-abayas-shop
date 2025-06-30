import { lazy } from "react";

const AllCategories = lazy(
  () => import("@/components/features/all-categories")
);

const AllCategoriesPage = () => {
  return (
    <div className="flex-1">
      <AllCategories />
    </div>
  );
};

export default AllCategoriesPage;
