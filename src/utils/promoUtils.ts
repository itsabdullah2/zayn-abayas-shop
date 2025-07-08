export type PromoType = "percentage" | "fixed" | "shipping";

export interface PromoCode {
  type: PromoType;
  value: number;
}

export interface DiscountResult {
  discount: number;
  shippingDiscount: number;
}

export interface TotalPriceResult {
  subtotal: number;
  discount: number;
  shippingDiscount: number;
  shippingFee: number;
  total: number;
}

const shippingFee = 15;

export const promoCodes: Record<string, PromoCode> = {
  SAVE10: { type: "percentage", value: 10 },
  GET5: { type: "fixed", value: 5 },
  FREESHIP: { type: "shipping", value: 0 },
};

export const normalizeCode = (code: string) => code.trim().toUpperCase();

export const getProductDiscount = (
  subtotal: number,
  code: string
): DiscountResult => {
  const promo = promoCodes[normalizeCode(code)];
  if (!promo) return { discount: 0, shippingDiscount: 0 };

  switch (promo.type) {
    case "percentage":
      return { discount: (subtotal * promo.value) / 100, shippingDiscount: 0 };
    case "fixed":
      return { discount: Math.min(promo.value, subtotal), shippingDiscount: 0 };
    case "shipping":
      return { discount: 0, shippingDiscount: shippingFee };
    default:
      return { discount: 0, shippingDiscount: 0 };
  }
};

export const getTotalPriceAfterDiscount = (
  subtotal: number,
  code: string
): TotalPriceResult => {
  const { discount, shippingDiscount } = getProductDiscount(subtotal, code);
  const finalShippingFee = shippingFee - shippingDiscount;

  return {
    subtotal,
    discount,
    shippingDiscount,
    shippingFee: finalShippingFee,
    total: subtotal - discount + finalShippingFee,
  };
};
