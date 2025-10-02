import { Routes, Route } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "./context/AppContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import {
  Navbar,
  Footer,
  AboutPage,
  CartPage,
  CheckoutPage,
  Error404Page,
  HomePage,
  OrdersPage,
  ProductDetailsPage,
  ProductDetailsPopup,
  SearchPopup,
  ShopPage,
  SignInPage,
  SignUpPage,
  AdminOrdersPage,
  AdminDashboardPage,
} from "./";
import { OrdersProvider } from "./context/OrdersContext";

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
        <Route
          path={"/checkout"}
          element={
            <ProtectedRoute role="user">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path={"/cart"} element={<CartPage />} />
        <Route
          path={"/orders"}
          element={
            <ProtectedRoute role="user">
              <OrdersProvider>
                <OrdersPage />
              </OrdersProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={"/admin/orders"}
          element={
            <ProtectedRoute role="admin">
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/admin/dashboard"}
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path={"/sign-in"} element={<SignInPage />} />
        <Route path={"/sign-up"} element={<SignUpPage />} />
        <Route path={"/products/:id"} element={<ProductDetailsPage />} />
        <Route path={"*"} element={<Error404Page />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Root;
