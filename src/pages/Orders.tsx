import { lazy } from "react";

const Orders = lazy(() => import("@/components/features/orders"));

const OrdersPage = () => {
  return (
    <div className="flex-1 bg-light-gray">
      <Orders />
    </div>
  );
};

export default OrdersPage;
