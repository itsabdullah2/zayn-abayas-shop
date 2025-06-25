import { getCartItems, getProducts } from "@/supabase/db/products";
import type { CartItemType } from "@/types";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import { useEffect, useState } from "react";

const useCartData = () => {
  const {
    setProductsIds,
    productsIds,
    cartVersion,
    setCartProducts,
    cartProducts,
  } = useContextSelector(CartContext, (ctx) => ({
    setProductsIds: ctx?.setProductsIds,
    productsIds: ctx?.productsIds,
    cartVersion: ctx?.cartVersion,
    setCartProducts: ctx?.setCartProducts,
    cartProducts: ctx?.cartProducts,
  }));

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

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts({ inCol: "id", inVal: productsIds });
      if (setCartProducts) setCartProducts(result);
    };
    fetchProducts();
  }, [productsIds, setCartProducts]);

  return { cartItems, cartProducts };
};

export default useCartData;
