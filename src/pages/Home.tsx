import { lazy } from "react";
const Home = lazy(() => import("@/components/features/home"));

const HomePage = () => {
  return (
    <section className="flex-1">
      <Home />
    </section>
  );
};

export default HomePage;
