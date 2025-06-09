import { useState } from "react";
import { createContext } from "use-context-selector";
import type { ProductType } from "@/types";

interface CartContextType {
  cartProducts: ProductType[];
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const values: CartContextType = {
    cartProducts,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
