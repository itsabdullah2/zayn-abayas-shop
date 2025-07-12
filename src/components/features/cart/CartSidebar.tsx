import PriceRow from "./PriceRow";
import { useNavigate } from "react-router-dom";
import useCheckout from "@/hooks/useCheckout";
import { useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import { useContextSelector } from "use-context-selector";

const CartSidebar = () => {
  const navigate = useNavigate();
  const { getTotalPriceAfterDiscount } = useCheckout();
  const totalPrice = useContextSelector(CartContext, (ctx) => ctx?.totalPrice)!;

  const priceBreakdown = useMemo(() => {
    return getTotalPriceAfterDiscount(totalPrice);
  }, [getTotalPriceAfterDiscount, totalPrice]);

  return (
    <aside
      className="w-full xl:basis-80 xl:col-span2 bg-neutral rounded-xl p-5 flex flex-col gap-5"
      // style={{ flexBasis: content }} /* uncomment this after adding a content if there later */
    >
      <div className="flex flex-col gap-2">
        <PriceRow label="Subtotal" value={priceBreakdown.total.toFixed(2)} />

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
        className="w-full relative group overflow-hidden primary-btn rounded-lg cursor-pointer"
        onClick={() => navigate("/checkout")}
      >
        Continue to checkout
        <span className="shine-effect group-hover:animate-shine" />
      </button>
    </aside>
  );
};

export default CartSidebar;
