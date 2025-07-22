import { lazy } from "react";
import { CATEGORY_IDS } from "@/constants";

const ProductGrid = lazy(() => import("./ProductGrid"));
const Hero = lazy(() => import("./Hero"));

const Home = () => {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col gap-20 pb-10">
        <ProductGrid
          title="Featured Products"
          eqCol="category_id"
          eqVal={CATEGORY_IDS.classic}
        />
        <ProductGrid title="Best Sellers" eqCol="is_best_seller" eqVal={true} />
        <ProductGrid
          title="New Arrivals"
          limit={4}
          eqCol="is_best_seller"
          eqVal={false}
        />
      </div>
    </>
  );
};

export default Home;
