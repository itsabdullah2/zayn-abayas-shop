import { CheckoutContext } from "@/context/CheckoutContext";
import useCartData from "@/hooks/useCartData";
import { getTotalPriceAfterDiscount } from "@/utils/promoUtils";
import { useMemo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useContextSelector } from "use-context-selector";

const OrderSummary = () => {
  const { cartProducts, getProductQuantity, handleRemoveProduct, totalPrice } =
    useCartData();
  const { appliedPromo, promoCode, setPromoCode, handleApplyPromo } =
    useContextSelector(CheckoutContext, (ctx) => ({
      appliedPromo: ctx?.appliedPromo,
      promoCode: ctx?.promoCode,
      setPromoCode: ctx?.setPromoCode,
      handleApplyPromo: ctx?.handleApplyPromo,
    }))!;

  const priceBreakdown = useMemo(
    () => getTotalPriceAfterDiscount(totalPrice, appliedPromo ?? ""),
    [totalPrice, appliedPromo]
  );

  return (
    <div className="col-span-2 bg-neutral w-full rounded-xl p-5">
      <h3 className="h3 font-medium">Order Summary</h3>

      <div className="flex flex-col gap-2 mt-4 pb-2 mb-2 border-b border-light-gray">
        {cartProducts?.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text">
                x{getProductQuantity?.(p.id)}
              </span>
              <h4 className="text-text font-sm font-medium">
                {p.product_name}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray font-medium text-sm">
                {p.product_price.toFixed(2)} E.L
              </span>
              <button
                className="text-text hover:text-red-600 duration-200 font-medium cursor-pointer"
                onClick={() => handleRemoveProduct?.(p.id)}
              >
                <FaTrashAlt size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-2 mb-2 border-b border-light-gray flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Delivery</span>
          <span className="text-sm text-text">
            {priceBreakdown.shippingFee.toFixed(2)} E.L
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Discount</span>
          <span className="text-sm text-text">
            {priceBreakdown.discount.toFixed(2)} E.L
          </span>
        </div>
      </div>

      <div className="pb-2 mb-2 border-b border-light-gray flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className=" text-primary font-medium">Total</span>
          <span className=" text-primary font-medium">
            {priceBreakdown.total.toFixed(2)} E.L
          </span>
        </div>
      </div>

      <div>
        <div className="flex border border-primary rounded-full p-1 -mt-3">
          <input
            type="text"
            placeholder="Type here..."
            value={promoCode}
            onChange={(e) => setPromoCode?.(e.target.value)}
            className="flex-1 pl-3 input"
          />
          <button
            type="button"
            onClick={() => handleApplyPromo?.(totalPrice)}
            className="relative group overflow-hidden primary-btn rounded-full! cursor-pointer"
          >
            Apply
            <span className="shine-effect group-hover:animate-shine" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
