import { lazy } from "react";
import { useContextSelector } from "use-context-selector";
import { OrdersContext } from "@/context/OrdersContext";
import OrderTrackingPopup from "@/components/features/orders/OrderTrackingPopup";

const Orders = lazy(() => import("@/components/features/orders"));

const OrdersPage = () => {
  const isTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.isTrackingPopup
  );
  return (
    <div className="flex-1 bg-light-gray">
      {isTrackingPopup && <OrderTrackingPopup />}
      <Orders />
    </div>
  );
};

export default OrdersPage;
