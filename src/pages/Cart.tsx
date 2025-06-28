import { lazy } from "react";

const Cart = lazy(() => import("@/components/features/cart"));

const CartPage = () => {
  return (
    <section className="flex-1 bg-light-gray">
      <Cart />
    </section>
  );
};

export default CartPage;
