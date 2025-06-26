import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import {
  createCartItem,
  getCartItems,
  removeItem,
} from "@/supabase/db/products";
import type { CartItemType, ProductType } from "@/types";

interface CartContextType {
  cartProducts: ProductType[];
  productsIds: string[];
  cartVersion: number;
  cartItems: CartItemType[];
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

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        const ids = data.map((item) => item.product_id);
        if (setProductsIds) setProductsIds(ids);
        setCartItems(data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };
    fetchCartItems();
  }, [setProductsIds, cartVersion]);

  const incrementCartVersion = () => setCartVersion((v) => v + 1);

  const handleRemoveProduct = async (id: string) => {
    try {
      await removeItem(id);
      incrementCartVersion();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCart = async (productId: string) => {
    try {
      await createCartItem({
        user_id: null,
        product_id: productId,
        quantity: 1,
      });

      setProductsIds((prev: string[]) =>
        prev.includes(productId) ? prev : [...prev, productId]
      );

      incrementCartVersion();
    } catch (err) {
      console.error(err);
    }
  };

  const values: CartContextType = {
    cartProducts,
    productsIds,
    cartVersion,
    cartItems,
    // Functions
    setCartProducts,
    handleRemoveProduct,
    setProductsIds,
    handleCart,
    incrementCartVersion,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
