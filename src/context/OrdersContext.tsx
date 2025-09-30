import { useState } from "react";
import { createContext } from "use-context-selector";

type OrdersContextType = {
  isTrackingPopup: string | null;
  // FUNCTIONS
  openTrackingPopup: (id: string) => void;
  closeTrackingPopup: () => void;
  orderCancellation?: string | null;
  setOrderCancellation?: React.Dispatch<React.SetStateAction<string | null>>;
};

export const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTrackingPopup, setIsTrackingPopup] = useState<string | null>(null);
  const [orderCancellation, setOrderCancellation] = useState<string | null>(
    null
  );

  const openTrackingPopup = (id: string) => {
    setIsTrackingPopup(id);
  };
  const closeTrackingPopup = () => {
    setIsTrackingPopup(null);
  };

  const values: OrdersContextType = {
    isTrackingPopup,
    // FUNCTIONS
    openTrackingPopup,
    closeTrackingPopup,
    orderCancellation,
    setOrderCancellation,
  };

  return (
    <OrdersContext.Provider value={values}>{children}</OrdersContext.Provider>
  );
};
