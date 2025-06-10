import { useState } from "react";
import { createContext } from "use-context-selector";
import type { ProductType } from "@/types";

interface CartContextType {
  cartProducts: ProductType[];
  handleRemoveProduct: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const handleRemoveProduct = (id: string) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const values: CartContextType = {
    cartProducts,
    handleRemoveProduct,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
