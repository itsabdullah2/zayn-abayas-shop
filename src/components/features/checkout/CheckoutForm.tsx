import useCartData from "@/hooks/useCartData";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { type FormEvent, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalPriceAfterDiscount } = useCartData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
          address: {
            line1: address,
            country,
          },
        },
      });

      if (error) {
        console.error("Payment method creation failed:", error);
        setError(error.message || "Payment failed");
        return;
      }
      setSubmitted(true);
      console.log(paymentMethod);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <p className="text-green-600 text-center">✅ Thank you for your order!</p>
    );
  }

  const totalPrice = getTotalPriceAfterDiscount();

  return (
    <form onSubmit={handleSubmit} className="col-span-3">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full border p-2 rounded"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Country (e.g. US, EG, DE)"
        className="w-full border p-2 rounded"
        value={country}
        onChange={(e) => setCountry(e.target.value.toUpperCase())}
        required
      />
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-primary text-white px-4 py-2 rounded w-full overflow-hidden relative group cursor-pointer"
      >
        Pay {totalPrice.total} E.L
        <span className="shine-effect group-hover:animate-shine" />
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
