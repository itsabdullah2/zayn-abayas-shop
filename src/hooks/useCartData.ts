import { getProducts, getVariants } from "@/supabase";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import { useCallback, useEffect, useMemo, useState } from "react";

const useCartData = () => {
  const {
    variantsIds,
    setCartProducts,
    cartProducts,
    handleCart,
    handleRemoveProduct,
    cartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    incrementCartVersion,
  } = useContextSelector(CartContext, (ctx) => ({
    setVariantsIds: ctx?.setVariantsIds,
    variantsIds: ctx?.variantsIds,
    cartVersion: ctx?.cartVersion,
    setCartProducts: ctx?.setCartProducts,
    cartProducts: ctx?.cartProducts,
    handleCart: ctx?.handleCart,
    handleRemoveProduct: ctx?.handleRemoveProduct,
    cartItems: ctx?.cartItems,
    handleIncreaseQuantity: ctx?.handleIncreaseQuantity,
    handleDecreaseQuantity: ctx?.handleDecreaseQuantity,
    incrementCartVersion: ctx?.incrementCartVersion,
  }));

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const variantIds = cartItems?.map((item) => item.variant_id);
        const variants = await getVariants({ inCol: "id", inVal: variantIds });

        const productIds = [...new Set(variants.map((v) => v.product_id))];
        const products = await getProducts({ inCol: "id", inVal: productIds });

        const enrichedCart = variants.map((variant) => {
          const product = products.find((p) => p.id === variant.product_id);
          return {
            ...variant,
            product_name: product?.product_name,
            product_desc: product?.product_desc,
            product_img: product?.product_img,
          };
        });

        setCartProducts?.(enrichedCart);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (cartItems?.length) {
      fetchCartData();
    } else {
      setCartProducts?.([]);
      setIsLoading(false);
    }
  }, [cartItems, setCartProducts]);

  const totalItems = useMemo(
    () => cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    [cartItems]
  );

  const totalPrice = useMemo(() => {
    if (!cartItems || !cartProducts) return 0;

    return cartItems.reduce((sum, item) => {
      const product = cartProducts.find((p) => p.id === item.variant_id);
      return product ? sum + (product.price ?? 0) * item.quantity : sum;
    }, 0);
  }, [cartItems, cartProducts]);

  const getProductQuantity = useCallback(
    (variantId: string) => {
      const item = cartItems?.find((item) => item.variant_id === variantId);
      return item?.quantity || 0;
    },
    [cartItems]
  );

  const getProductTotalPrice = useCallback(
    (variantId: string) => {
      const item = cartItems?.find((item) => item.variant_id === variantId);
      const product = cartProducts?.find((p) => p.id === variantId);

      if (item && product) {
        return product.price * item.quantity;
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
    variantsIds,
    getProductQuantity,
    getProductTotalPrice,
    handleCart,
    handleRemoveProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    incrementCartVersion,
  };
};

export default useCartData;
