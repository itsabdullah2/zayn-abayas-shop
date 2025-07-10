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
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useContextSelector(CartContext, (ctx) => ({
    setProductsIds: ctx?.setProductsIds,
    productsIds: ctx?.productsIds,
    cartVersion: ctx?.cartVersion,
    setCartProducts: ctx?.setCartProducts,
    cartProducts: ctx?.cartProducts,
    handleCart: ctx?.handleCart,
    handleRemoveProduct: ctx?.handleRemoveProduct,
    cartItems: ctx?.cartItems,
    handleIncreaseQuantity: ctx?.handleIncreaseQuantity,
    handleDecreaseQuantity: ctx?.handleDecreaseQuantity,
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

  const totalPrice = useMemo(() => {
    if (!cartItems || !cartProducts) return 0;

    return cartItems.reduce((sum, item) => {
      const product = cartProducts.find((p) => p.id === item.product_id);
      return product ? sum + product.product_price * item.quantity : sum;
    }, 0);
  }, [cartItems, cartProducts]);

  const getProductQuantity = useCallback(
    (productId: string) => {
      const item = cartItems?.find((item) => item.product_id === productId);
      return item?.quantity || 1;
    },
    [cartItems]
  );

  const getProductTotalPrice = useCallback(
    (productId: string) => {
      const item = cartItems?.find((item) => item.product_id === productId);
      const product = cartProducts?.find((p) => p.id === productId);

      if (item && product) {
        return product.product_price * item.quantity;
      }
      return 0;
    },
    [cartItems, cartProducts]
  );

  return {
    cartItems,
    cartProducts,
    totalPrice,
    totalItems,
    isLoading,
    getProductQuantity,
    getProductTotalPrice,
    handleCart,
    handleRemoveProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartData;
