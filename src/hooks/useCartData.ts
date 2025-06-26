import { getProducts } from "@/supabase/db/products";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import { useCallback, useEffect, useMemo, useState } from "react";

const useCartData = () => {
  const {
    productsIds,
    setCartProducts,
    cartProducts,
    handleCart,
    handleRemoveProduct,
    cartItems,
  } = useContextSelector(CartContext, (ctx) => ({
    setProductsIds: ctx?.setProductsIds,
    productsIds: ctx?.productsIds,
    cartVersion: ctx?.cartVersion,
    setCartProducts: ctx?.setCartProducts,
    cartProducts: ctx?.cartProducts,
    handleCart: ctx?.handleCart,
    handleRemoveProduct: ctx?.handleRemoveProduct,
    cartItems: ctx?.cartItems,
  }));

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    () =>
      cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0,
    [cartItems]
  );
  const totalPrice = useMemo(
    () =>
      cartItems &&
      cartItems.reduce((sum, item) => {
        const product = cartProducts?.find((p) => p.id === item.product_id);
        return product ? sum + product.product_price * item.quantity : sum;
      }, 0),
    [cartItems, cartProducts]
  );

  const getProductQuantity = useCallback(
    (productId: string) => {
      const item =
        cartItems && cartItems.find((item) => item.product_id === productId);
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
    handleCart,
    handleRemoveProduct,
  };
};

export default useCartData;
