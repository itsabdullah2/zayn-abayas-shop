import CheckoutForm from "./CheckoutForm";
// import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <div className="section-container grid grid-cols-5 gap-5">
      <CheckoutForm />
      {/* <OrderSummary /> */}
    </div>
  );
};

export default Checkout;
