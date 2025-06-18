import { lazy } from "react";

const FeaturedProducts = lazy(
  () => import("@/components/layout/home/FeaturedProducts")
);
const Hero = lazy(() => import("@/components/layout/home/Hero"));

const Home = () => {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <Hero />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
