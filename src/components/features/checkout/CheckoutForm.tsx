import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import useCartData from "@/hooks/useCartData";
import CheckoutInputs from "./CheckoutInputs";
import SubmitButton from "./SubmitButton";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalPriceAfterDiscount } = useCartData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "country" ? e.target.value.toUpperCase() : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement("card");
    if (!cardElement) return;

    setLoading(true);
    setError("");

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: {
            line1: formData.address1,
            line2: formData.address2,
            city: formData.city,
            country: formData.country,
          },
        },
      });

      if (error) {
        setError(error.message || "Payment failed");
        return;
      }

      setSubmitted(true);
      console.log(paymentMethod);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-green-600 text-center text-lg font-medium">
        ✅ Thank you for your order!
      </p>
    );
  }

  const totalPrice = getTotalPriceAfterDiscount();

  return (
    <form onSubmit={handleSubmit} className="col-span-3 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CheckoutInputs formData={formData} handleChange={handleChange} />
      </div>
      <SubmitButton
        loading={loading}
        total={totalPrice.total}
        stripeAvailable={!!stripe}
      />
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
