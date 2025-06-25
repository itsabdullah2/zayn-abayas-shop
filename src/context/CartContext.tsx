import { useState } from "react";
import { createContext } from "use-context-selector";
import { createCartItem } from "@/supabase/db/products";
import type { ProductType } from "@/types";

interface CartContextType {
  cartProducts: ProductType[];
  productsIds: string[];
  cartVersion: number;
  // Functions
  setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleRemoveProduct: (id: string) => void;
  setProductsIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleCart: (productId: string) => void;
  incrementCartVersion: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [productsIds, setProductsIds] = useState<string[]>([]);
  const [cartVersion, setCartVersion] = useState<number>(0);

  const incrementCartVersion = () => setCartVersion((v) => v + 1);

  const handleRemoveProduct = (id: string) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleCart = async (productId: string) => {
    await createCartItem({
      user_id: null,
      product_id: productId,
      quantity: 1,
    });

    setProductsIds((prev: string[]) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );

    incrementCartVersion();
  };

  const values: CartContextType = {
    cartProducts,
    productsIds,
    cartVersion,
    // Functions
    setCartProducts,
    handleRemoveProduct,
    setProductsIds,
    handleCart,
    incrementCartVersion,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
