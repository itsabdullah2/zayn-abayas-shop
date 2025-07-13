// Export all components from one place

import { lazy } from "react";

export { default as Navbar } from "./components/common/navbar/Navbar";
export { default as Footer } from "./components/common/footer/Footer";

export const HomePage = lazy(() => import("./pages/Home"));
export const AboutPage = lazy(() => import("./pages/About"));
export const ShopPage = lazy(() => import("./pages/Shop"));
export const AllCategoriesPage = lazy(() => import("./pages/AllCategories"));
export const CheckoutPage = lazy(() => import("./pages/Checkout"));
export const OrderStatusPage = lazy(() => import("./pages/OrderStatus"));
export const CartPage = lazy(() => import("./pages/Cart"));
export const SearchPopup = lazy(
  () => import("./components/common/search/SearchPopup")
);
export const ProductDetailsPopup = lazy(
  () => import("./components/common/details_popup")
);
export const OrdersPage = lazy(() => import("./pages/Orders"));
export const Error404Page = lazy(() => import("./pages/Error404"));
export const SignInPage = lazy(() => import("./pages/SignIn"));
export const SignUpPage = lazy(() => import("./pages/SignUp"));
export const ProductDetailsPage = lazy(() => import("./pages/ProductDetails"));
