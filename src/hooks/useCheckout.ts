import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import {
  getTotalPriceAfterDiscount,
  getProductDiscount,
} from "@/utils/promoUtils";
import { useCallback } from "react";

const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  const { appliedPromo, promoCode, setPromoCode, handleApplyPromo } = context;

  const getTotals = useCallback(
    (totalPrice: number, code?: string) =>
      getTotalPriceAfterDiscount(totalPrice || 0, code ?? ""),
    []
  );

  const getDiscount = useCallback(
    (totalPrice: number, code: string) =>
      getProductDiscount(totalPrice || 0, code),
    []
  );

  return {
    appliedPromo,
    promoCode,
    setPromoCode,
    handleApplyPromo,
    getTotalPriceAfterDiscount: getTotals,
    getProductDiscount: getDiscount,
  };
};

export default useCheckout;
