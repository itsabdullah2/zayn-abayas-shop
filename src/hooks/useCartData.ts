import { getProducts } from "@/supabase/db/products";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import { useCallback, useEffect, useMemo, useState } from "react";

// Types for promo codes
type PromoType = "percentage" | "fixed" | "shipping";

interface PromoCode {
  type: PromoType;
  value: number;
}

interface DiscountResult {
  discount: number;
  shippingDiscount: number;
}

interface TotalPriceResult {
  subtotal: number;
  discount: number;
  shippingDiscount: number;
  shippingFee: number;
  total: number;
}

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

  const getProductTotalPrice = useCallback(
    (productId: string) => {
      const item =
        cartItems && cartItems.find((item) => item.product_id === productId);
      const product = cartProducts?.find((p) => p.id === productId);

      if (item && product) {
        return product.product_price * item.quantity;
      }
      return 0;
    },
    [cartItems, cartProducts]
  );

  const shippingFee = 15;

  // Promo codes configuration
  const promoCodes: Record<string, PromoCode> = {
    SAVE10: { type: "percentage", value: 10 },
    GET5: { type: "fixed", value: 5 },
    FREESHIP: { type: "shipping", value: 0 },
  };

  const normalizeCode = (code: string) => code.trim().toUpperCase();

  const getProductDiscount = useCallback(
    (promoCode: string, subtotal: number): DiscountResult => {
      const promo = promoCodes[normalizeCode(promoCode)];

      if (!promo) {
        return { discount: 0, shippingDiscount: 0 };
      }

      switch (promo.type) {
        case "percentage":
          return {
            discount: (subtotal * promo.value) / 100,
            shippingDiscount: 0,
          };
        case "fixed":
          return {
            discount: Math.min(promo.value, subtotal), // Don't discount more than subtotal
            shippingDiscount: 0,
          };
        case "shipping":
          return {
            discount: 0,
            shippingDiscount: shippingFee,
          };
        default:
          return { discount: 0, shippingDiscount: 0 };
      }
    },
    [shippingFee, promoCodes]
  );

  const getTotalPriceAfterDiscount = useCallback(
    (promoCode?: string): TotalPriceResult => {
      const subtotal = totalPrice || 0;

      if (!promoCode) {
        return {
          subtotal,
          discount: 0,
          shippingDiscount: 0,
          shippingFee,
          total: subtotal + shippingFee,
        };
      }

      const { discount, shippingDiscount } = getProductDiscount(
        promoCode,
        subtotal
      );
      const finalShippingFee = shippingFee - shippingDiscount;

      return {
        subtotal,
        discount,
        shippingDiscount,
        shippingFee: finalShippingFee,
        total: subtotal - discount + finalShippingFee,
      };
    },
    [totalPrice, shippingFee, getProductDiscount]
  );

  return {
    cartItems,
    cartProducts,
    totalPrice,
    totalItems,
    isLoading,
    getProductQuantity,
    getProductTotalPrice,
    getProductDiscount,
    getTotalPriceAfterDiscount,
    shippingFee,
    handleCart,
    handleRemoveProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartData;
