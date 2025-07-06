import { lazy } from "react";

const Checkout = lazy(() => import("@/components/features/checkout"));

const CheckoutPage = () => {
  return (
    <section className="flex-1 bg-neutral">
      <Checkout />
    </section>
  );
};

export default CheckoutPage;
