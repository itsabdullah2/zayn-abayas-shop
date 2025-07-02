import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StripeProvider } from "./context/StripeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StripeProvider>
        <AuthProvider>
          <AppProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AppProvider>
        </AuthProvider>
      </StripeProvider>
    </BrowserRouter>
  </StrictMode>
);
