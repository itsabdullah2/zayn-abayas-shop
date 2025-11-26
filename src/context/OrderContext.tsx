import { createContext } from "use-context-selector";
import { useState } from "react";

export type TProductData = {
  productName: string;
  productPrice: number;
  productDesc: string;
  productImg: string | File;
};

type OrderContextType = {
  newProductData: TProductData;
  handleFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const OrderContext = createContext<OrderContextType | null>(null);

const INITIAL_STATE: TProductData = {
  productName: "",
  productPrice: 0,
  productDesc: "",
  productImg: "",
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [newProductData, setNewProductData] =
    useState<TProductData>(INITIAL_STATE);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];

      if (!file) return;

      setNewProductData((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    setNewProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const values: OrderContextType = {
    newProductData,
    // Functions
    handleFieldChange,
  };

  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};
