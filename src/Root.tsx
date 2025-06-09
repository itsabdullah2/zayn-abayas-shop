import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "./context/AppContext";

const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const MenuPage = lazy(() => import("./pages/Menu"));
const AllCategoriesPage = lazy(() => import("./pages/AllCategories"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const OrderStatusPage = lazy(() => import("./pages/OrderStatus"));
const CartPage = lazy(() => import("./pages/Cart"));
const SearchPopup = lazy(
  () => import("./components/common/navbar/SearchPopup")
);

const Root = () => {
  const searchPopup = useContextSelector(
    AppContext,
    (value) => value?.searchPopup
  );

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      {searchPopup && <SearchPopup />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/menu"} element={<MenuPage />} />
        <Route path={"/categories"} element={<AllCategoriesPage />} />
        <Route path={"/checkout"} element={<CheckoutPage />} />
        <Route path={"/order-status"} element={<OrderStatusPage />} />
        <Route path={"/cart"} element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Root;
