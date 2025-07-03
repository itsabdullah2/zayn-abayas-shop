import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "./context/AppContext";

const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ShopPage = lazy(() => import("./pages/Shop"));
const AllCategoriesPage = lazy(() => import("./pages/AllCategories"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const OrderStatusPage = lazy(() => import("./pages/OrderStatus"));
const CartPage = lazy(() => import("./pages/Cart"));
const SearchPopup = lazy(
  () => import("./components/common/navbar/SearchPopup")
);
const ProductDetailsPopup = lazy(
  () => import("@/components/common/details_popup")
);
const OrdersPage = lazy(() => import("./pages/Orders"));
const WishlistPage = lazy(() => import("./pages/Wishlist"));
const Error404Page = lazy(() => import("./pages/Error404"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));

const Root = () => {
  const searchPopup = useContextSelector(
    AppContext,
    (value) => value?.searchPopup
  );
  const productDetailsPopup = useContextSelector(
    AppContext,
    (value) => value?.productPopup
  );
  const productId = useContextSelector(
    AppContext,
    (value) => value?.productPopup
  )!;

  return (
    <div className="flex flex-col min-h-dvh bg-neutral">
      <Navbar />
      {searchPopup && <SearchPopup />}
      {productDetailsPopup && <ProductDetailsPopup productId={productId} />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/shop"} element={<ShopPage />} />
        <Route path={"/categories"} element={<AllCategoriesPage />} />
        <Route path={"/checkout"} element={<CheckoutPage />} />
        <Route path={"/order-status"} element={<OrderStatusPage />} />
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"/orders"} element={<OrdersPage />} />
        <Route path={"/wishlist"} element={<WishlistPage />} />
        <Route path={"/sign-in"} element={<SignInPage />} />
        <Route path={"/sign-up"} element={<SignUpPage />} />
        <Route path={"*"} element={<Error404Page />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Root;
