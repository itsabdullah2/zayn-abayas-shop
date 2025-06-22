import { lazy } from "react";

const FeaturedProducts = lazy(
  () => import("@/components/features/home/FeaturedProducts")
);
const Hero = lazy(() => import("@/components/features/home/Hero"));
const BestSellers = lazy(
  () => import("@/components/features/home/BestSellers")
);
const NewArrivals = lazy(
  () => import("@/components/features/home/NewArrivals")
);

const Home = () => {
  return (
    <div className="flex-1">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col gap-20 pb-10">
        <FeaturedProducts />
        <BestSellers />
        <NewArrivals />
      </div>
    </div>
  );
};

export default Home;
