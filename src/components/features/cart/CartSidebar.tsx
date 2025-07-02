import { useState } from "react";
import useCartData from "@/hooks/useCartData";
import PriceRow from "./PriceRow";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { getTotalPriceAfterDiscount } = useCartData();
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [promoError, setPromoError] = useState<string>("");
  const navigate = useNavigate();

  const handleApplyPromo = () => {
    const normalized = promoCode.trim().toUpperCase();

    if (!normalized) {
      setPromoError("Please enter a promo code");
      return;
    }

    const priceBreakdown = getTotalPriceAfterDiscount(promoCode);

    // ✅ Prevent duplicate apply
    if (normalized === appliedPromo) {
      setPromoError("Promo code already applied");
      return;
    }

    // Check if the promo code had any effect
    if (
      priceBreakdown.discount === 0 &&
      priceBreakdown.shippingDiscount === 0
    ) {
      setPromoError("Invalid promo code");
      return;
    }

    setAppliedPromo(promoCode);
    setPromoError("");
  };

  const priceBreakdown = getTotalPriceAfterDiscount(appliedPromo);

  return (
    <aside className="col-span-2 bg-neutral rounded-xl p-5 flex flex-col gap-5">
      <h3 className="h3">Promo code</h3>

      <div className="flex flex-col gap-2">
        <div className="flex border border-primary rounded-full p-1 -mt-3">
          <input
            type="text"
            placeholder="Type here..."
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 pl-3 input"
          />
          <button
            onClick={handleApplyPromo}
            className="relative group overflow-hidden primary-btn rounded-full! cursor-pointer"
          >
            Apply
            <span className="shine-effect group-hover:animate-shine" />
          </button>
        </div>

        {promoError && <p className="text-red-600 text-sm">{promoError}</p>}

        {appliedPromo && (
          <p className="text-green-600 text-sm">
            Promo code "{appliedPromo}" applied successfully!
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <PriceRow label="Subtotal" value={priceBreakdown.subtotal.toFixed(2)} />

        {priceBreakdown.discount > 0 && (
          <PriceRow
            label="Discount"
            value={`-${priceBreakdown.discount.toFixed(2)}`}
            isDiscount
          />
        )}

        {priceBreakdown.shippingDiscount > 0 && (
          <PriceRow
            label="Shipping Discount"
            value={`-${priceBreakdown.shippingDiscount.toFixed(2)}`}
            isDiscount
          />
        )}

        <PriceRow
          label="Shipping"
          value={priceBreakdown.shippingFee.toFixed(2)}
        />

        <div className="flex items-center justify-between font-semibold text-base">
          <span>Total</span>
          <span>{priceBreakdown.total.toFixed(2)} L.E</span>
        </div>
      </div>

      <button
        className="w-full relative group overflow-hidden primary-btn rounded-xl! cursor-pointer"
        onClick={() => navigate("/checkout")}
      >
        Continue to checkout
        <span className="shine-effect group-hover:animate-shine" />
      </button>
    </aside>
  );
};

export default CartSidebar;
