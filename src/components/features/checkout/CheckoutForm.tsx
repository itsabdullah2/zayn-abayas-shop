import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import CheckoutInputs from "./CheckoutInputs";
import SubmitButton from "./SubmitButton";
import useCheckout from "@/hooks/useCheckout";
import { getTotalPriceAfterDiscount } from "@/utils/promoUtils";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/context/CartContext";
import {
  supabase,
  createOrder,
  clearCart,
  cancelOrder,
  updateOrderStatus,
  createNotification,
} from "@/supabase";
import type { EnrichedCartItem } from "@/types";
import { AuthContext } from "@/context/AuthContext";
import useCartData from "@/hooks/useCartData";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { appliedPromo } = useCheckout();
  const totalPrice = useContextSelector(CartContext, (ctx) => ctx?.totalPrice)!;
  const cartItems = useContextSelector(CartContext, (ctx) => ctx?.cartItems)!;
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);
  const { incrementCartVersion } = useCartData();

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

  const navigate = useNavigate();

  const priceBreakdown = useMemo(() => {
    return getTotalPriceAfterDiscount(totalPrice, appliedPromo ?? "");
  }, [totalPrice, appliedPromo]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "country" ? e.target.value.toUpperCase() : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const cardElement = elements.getElement("card");
    if (!cardElement) return;

    setLoading(true);
    setError("");

    try {
      const enrichedItems: EnrichedCartItem[] = await Promise.all(
        cartItems.map(async (item) => {
          const { data: variant, error } = await supabase
            .from("product_variants")
            .select("product_id, color_id, size_id, price")
            .eq("id", item.variant_id)
            .single();

          if (error) throw error;

          return {
            variant_id: item.variant_id,
            product_id: variant.product_id,
            color_id: variant.color_id,
            size_id: variant.size_id,
            quantity: item.quantity,
            price: variant.price,
          };
        })
      );

      // Check the stock if the product is available
      // Decrease the stock by the quantity that the client asked

      let orderId = "";

      // Step 1: Create The Order in DB
      if (user) {
        const order = await createOrder({
          userId: user.id,
          totalPrice: priceBreakdown.total,
          items: enrichedItems,
        });

        if (!order || !order.id) {
          throw new Error("Failed to create the order");
        }

        orderId = order.id;
      }

      // Step 2: Payment Process
      const { error: stripeError } = await stripe.createPaymentMethod({
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

      if (stripeError) {
        setError(stripeError.message || "Payment Failed");

        // Cancel the order from supabase
        if (user && orderId) {
          await cancelOrder(orderId, user.id);
        }
        return;
      }

      // Step 3: Update the status and Clear The Cart Table After The Previous Steps are succeed
      if (user && orderId && profile) {
        await updateOrderStatus("paid", orderId, user.id);
        await createNotification({
          user_id: user.id,
          user_name: profile.username,
          title: "تم شراء منتج",
          message: `قام بشراء منتج الأن`, // Place the order name instead of "منتج الأن"
          type: "عملية شراء",
          is_read: false,
        });
        await clearCart(user.id);
        incrementCartVersion?.();
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
    setSubmitted(false);
  };
  const handleViewOrder = () => {
    navigate("/orders");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />
        <div className="flex flex-col items-center justify-center w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 overflow-y-hidden">
          <div className="bg-green-100 p-6 rounded-full mb-4 animate-bounce">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            تم الدفع بنجاح!
          </h2>
          <p className="text-gray-600 mt-1">شكرًا لتسوقك معنا</p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleViewOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl cursor-pointer"
            >
              عرض الطلب
            </button>
            <button
              onClick={handleGoHome}
              className="border border-gray-300 px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </>
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
