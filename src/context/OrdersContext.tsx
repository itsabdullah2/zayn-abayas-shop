import { useState } from "react";
import { createContext } from "use-context-selector";

type OrdersContextType = {
  isTrackingPopup: string | null;
  // FUNCTIONS
  openTrackingPopup: (id: string) => void;
  closeTrackingPopup: () => void;
  orderCancellation?: string | null;
  setOrderCancellation?: React.Dispatch<React.SetStateAction<string | null>>;
  setReturnPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  returnPopup?: boolean;
};

export const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTrackingPopup, setIsTrackingPopup] = useState<string | null>(null);
  const [orderCancellation, setOrderCancellation] = useState<string | null>(
    null
  );
  const [returnPopup, setReturnPopup] = useState(false);

  const openTrackingPopup = (id: string) => {
    setIsTrackingPopup(id);
  };
  const closeTrackingPopup = () => {
    setIsTrackingPopup(null);
  };

  const values: OrdersContextType = {
    isTrackingPopup,
    returnPopup,
    // FUNCTIONS
    openTrackingPopup,
    closeTrackingPopup,
    orderCancellation,
    setOrderCancellation,
    setReturnPopup,
  };

  return (
    <OrdersContext.Provider value={values}>{children}</OrdersContext.Provider>
  );
};
