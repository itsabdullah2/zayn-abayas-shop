import { useContextSelector } from "use-context-selector";
import { CheckoutContext } from "@/context/CheckoutContext";
import {
  getTotalPriceAfterDiscount,
  getProductDiscount,
} from "@/utils/promoUtils";
import { useCallback } from "react";

const useCheckout = () => {
  const { appliedPromo, promoCode, setPromoCode, handleApplyPromo } =
    useContextSelector(CheckoutContext, (ctx) => ({
      appliedPromo: ctx?.appliedPromo,
      promoCode: ctx?.promoCode,
      setPromoCode: ctx?.setPromoCode,
      handleApplyPromo: ctx?.handleApplyPromo,
    }));

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
