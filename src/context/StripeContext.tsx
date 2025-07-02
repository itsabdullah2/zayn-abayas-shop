// StripeProvider.tsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PUBLISHABLE_KEY =
  "pk_test_51Rg5GVKDKGlLIL4Rmv2sg61gNjrkt30hyXT9tR4ZbgoCwKNXK6hgcZuiK7h1lVyzVPctVgFGN27YFhggHIvezd9t00n3DpD0mw";

const stripePromise = loadStripe(PUBLISHABLE_KEY);

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
