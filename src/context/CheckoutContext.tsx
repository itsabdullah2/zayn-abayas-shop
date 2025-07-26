import React, { useCallback, useMemo, useState, createContext } from "react";
import {
  getProductDiscount,
  getTotalPriceAfterDiscount,
  normalizeCode,
} from "@/utils/promoUtils";

interface CheckoutContextType {
  appliedPromo: string;
  promoError: string;
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  handleApplyPromo: (totalPrice: number) => void;
  getTotals: (totalPrice: number, code: string | undefined) => void;
  getDiscount: (totalPrice: number, code: string) => void;
}

export const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = useCallback(
    (totalPrice: number) => {
      const normalized = normalizeCode(promoCode);

      if (!normalized) {
        setPromoError("Please enter a promo code");
        return;
      }

      const priceBreakdown = getTotalPriceAfterDiscount(
        totalPrice || 0,
        normalized
      );

      if (normalized === appliedPromo) {
        setPromoError("Promo code already applied");
        return;
      }

      if (
        priceBreakdown.discount === 0 &&
        priceBreakdown.shippingDiscount === 0
      ) {
        setPromoError("Invalid promo code");
        return;
      }

      setAppliedPromo(normalized);
      setPromoError("");
    },
    [appliedPromo, promoCode]
  );

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

  const value: CheckoutContextType = useMemo(
    () => ({
      appliedPromo,
      promoError,
      promoCode,
      setPromoCode,
      handleApplyPromo,
      getTotals,
      getDiscount,
    }),
    [
      appliedPromo,
      promoError,
      promoCode,
      handleApplyPromo,
      getTotals,
      getDiscount,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
