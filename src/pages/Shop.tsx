import { lazy } from "react";

const Shop = lazy(() => import("@/components/features/shop"));

const ShopPage = () => {
  return (
    <div className="flex-1 bg-neutral">
      <Shop />
    </div>
  );
};

export default ShopPage;
