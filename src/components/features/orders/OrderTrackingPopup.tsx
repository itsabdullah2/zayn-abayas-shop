import { OrdersContext } from "@/context/OrdersContext";
import { useContextSelector } from "use-context-selector";

const OrderTrackingPopup = () => {
  const closeTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.closeTrackingPopup
  );

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white">
        OrderTrackingPopup
        <button
          className="w-5 h-5 border border-soft-gray flex-center rounded-md cursor-pointer"
          onClick={closeTrackingPopup}
        >
          X
        </button>
      </div>
    </>
  );
};

export default OrderTrackingPopup;
