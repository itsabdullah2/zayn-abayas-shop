import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
  AdminProductsPage,
} from "./";
import { OrdersProvider } from "./context/OrdersContext";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { SidebarProvider } from "./context/SidebarContext";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { user, profile } = useContextSelector(AuthContext, (ctx) => ({
    user: ctx?.user,
    profile: ctx?.profile,
  }));

  useEffect(() => {
    if (user && profile?.role === "admin" && !isAdminRoute) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, profile?.role, isAdminRoute, navigate]);

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
      {!isAdminRoute && <Navbar />}
      {searchPopup && <SearchPopup />}
      {productDetailsPopup && <ProductDetailsPopup productId={productId} />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/shop"} element={<ShopPage />} />
        <Route
          path={"/checkout"}
          element={
            <ProtectedRoute role="customer">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path={"/cart"} element={<CartPage />} />
        <Route
          path={"/orders"}
          element={
            <ProtectedRoute role="customer">
              <OrdersProvider>
                <OrdersPage />
              </OrdersProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <SidebarProvider>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                </Routes>
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route path={"/sign-in"} element={<SignInPage />} />
        <Route path={"/sign-up"} element={<SignUpPage />} />
        <Route path={"/products/:id"} element={<ProductDetailsPage />} />
        <Route path={"*"} element={<Error404Page />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default Root;
