import PriceRow from "./PriceRow";
import { useNavigate } from "react-router-dom";
import useCheckout from "@/hooks/useCheckout";
import useCartData from "@/hooks/useCartData";
import { useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import { useContextSelector } from "use-context-selector";

const CartSidebar = () => {
  const navigate = useNavigate();
  // const { getTotalPriceAfterDiscount } = useCheckout();
  // const { totalPrice } = useCartData();
  const totalPrice = useContextSelector(CartContext, (ctx) => ctx?.totalPrice)!;

  // const priceBreakdown = useMemo(() => {
  //   return getTotalPriceAfterDiscount(totalPrice);
  // }, [getTotalPriceAfterDiscount, totalPrice]);

  // console.log("Cart is rendering");

  return (
    <aside className="xl:col-span-2 bg-neutral rounded-xl p-5 flex flex-col gap-5">
      <h3 className="h3">Promo code</h3>

      <div className="flex flex-col gap-2">
        {/* <div className="flex border border-primary rounded-full p-1 -mt-3">
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
        </div> */}

        {/* {promoError && <p className="text-red-600 text-sm">{promoError}</p>} */}

        {/* {appliedPromo && (
          <p className="text-green-600 text-sm">
            Promo code "{appliedPromo}" applied successfully!
          </p>
        )} */}
      </div>

      {/* <div className="flex flex-col gap-2">
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
      </div> */}

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
