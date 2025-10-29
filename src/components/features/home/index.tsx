import { lazy } from "react";
import { CATEGORY_IDS } from "@/constants";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "@/context/AuthContext";

const ProductGrid = lazy(() => import("./ProductGrid"));
const Hero = lazy(() => import("./Hero"));

const Home = () => {
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);
  console.log(profile);
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col gap-20 pb-10">
        <ProductGrid
          title="منتجات مميزة"
          eqCol="category_id"
          eqVal={CATEGORY_IDS.classic}
        />
        <ProductGrid
          title="الأكثر مبيعًا"
          eqCol="is_best_seller"
          eqVal={true}
        />
        <ProductGrid
          title="المنتجات الجديدة"
          limit={4}
          eqCol="is_best_seller"
          eqVal={false}
        />
      </div>
    </>
  );
};

export default Home;
