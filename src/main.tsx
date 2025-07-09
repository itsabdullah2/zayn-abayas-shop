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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
