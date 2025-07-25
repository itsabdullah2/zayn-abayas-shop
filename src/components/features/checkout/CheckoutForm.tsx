import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useMemo, useState, type FormEvent } from "react";
import CheckoutInputs from "./CheckoutInputs";
import SubmitButton from "./SubmitButton";
import useCheckout from "@/hooks/useCheckout";
import { getTotalPriceAfterDiscount } from "@/utils/promoUtils";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { appliedPromo } = useCheckout();
  const totalPrice = useContextSelector(CartContext, (ctx) => ctx?.totalPrice)!;

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

  const priceBreakdown = useMemo(() => {
    return getTotalPriceAfterDiscount(totalPrice, appliedPromo ?? "");
  }, [totalPrice, appliedPromo]);

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
      const {
        error,
        // paymentMethod
      } = await stripe.createPaymentMethod({
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
      // console.log(paymentMethod);
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
        ✅ شكرًا لطلبك!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col gap-4 bg-neutral rounded-xl p-5 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
        <CheckoutInputs formData={formData} handleChange={handleChange} />
      </div>
      <SubmitButton
        loading={loading}
        total={priceBreakdown.total}
        stripeAvailable={!!stripe}
      />
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
