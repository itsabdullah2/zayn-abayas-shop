import { getCartItems, getProducts } from "@/supabase/db/products";
import type { CartItemType } from "@/types";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import { useCallback, useEffect, useMemo, useState } from "react";

const useCartData = () => {
  const {
    setProductsIds,
    productsIds,
    cartVersion,
    setCartProducts,
    cartProducts,
    handleCart
  } = useContextSelector(CartContext, (ctx) => ({
    setProductsIds: ctx?.setProductsIds,
    productsIds: ctx?.productsIds,
    cartVersion: ctx?.cartVersion,
    setCartProducts: ctx?.setCartProducts,
    cartProducts: ctx?.cartProducts,
    handleCart: ctx?.handleCart
  }));

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      try {
        const result = await getProducts({ inCol: "id", inVal: productsIds });
        if (setCartProducts) setCartProducts(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [productsIds, setCartProducts]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const product = cartProducts?.find((p) => p.id === item.product_id);
        return product ? sum + product.product_price * item.quantity : sum;
      }, 0),
    [cartItems, cartProducts]
  );

  const getProductQuantity = useCallback(
    (productId: string) => {
      const item = cartItems.find((item) => item.product_id === productId);
      return item?.quantity || 1;
    },
    [cartItems]
  );

  return {
    cartItems,
    cartProducts,
    totalPrice,
    totalItems,
    isLoading,
    getProductQuantity,
    handleCart
  };
};

export default useCartData;
