import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <div className="section-container flex flex-col xl:flex-row items-start gap-5">
      <OrderSummary />
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
