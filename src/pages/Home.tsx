import { lazy } from "react";

const FeaturedProducts = lazy(
  () => import("@/components/features/home/FeaturedProducts")
);
const Hero = lazy(() => import("@/components/features/home/Hero"));

const Home = () => {
  return (
    <div className="flex-1">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
