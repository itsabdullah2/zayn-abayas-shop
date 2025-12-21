import { createContext } from "use-context-selector";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export type TProductData = {
  productName: string;
  productPrice: number;
  productDesc: string;
  productImg: string | File;
  categoryId: string;
  variants: {
    color: string;
    size: string;
  };
  productStock: number;
};

type OrderContextType = {
  newProductData: TProductData;
  handleFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setNewProductData: React.Dispatch<React.SetStateAction<TProductData>>;
  resetProductData: () => void;
  debouncedProductData: TProductData;
};

export const ProductContext = createContext<OrderContextType | null>(null);

const INITIAL_STATE: TProductData = {
  productName: "",
  productPrice: 0,
  productDesc: "",
  productImg: "",
  categoryId: "",
  variants: {
    color: "",
    size: "",
  },
  productStock: 0,
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newProductData, setNewProductData] =
    useState<TProductData>(INITIAL_STATE);

  const debouncedProductData = useDebounce<TProductData>(newProductData, 500);

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

  const resetProductData = () => {
    setNewProductData(INITIAL_STATE);
  };

  const values: OrderContextType = {
    newProductData,
    debouncedProductData,
    // Functions
    setNewProductData,
    handleFieldChange,
    resetProductData,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
