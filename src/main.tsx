import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StripeProvider } from "./context/StripeContext";
import { CheckoutProvider } from "./context/CheckoutContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StripeProvider>
          <AuthProvider>
            <AppProvider>
              <CheckoutProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </CheckoutProvider>
            </AppProvider>
          </AuthProvider>
        </StripeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
