import { createContext } from "use-context-selector";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type TVariantsState = { color_id: string; size_id: string; stock: number };

export type TProductData = {
  productName: string;
  productPrice: number;
  productDesc: string;
  productImg: string | File;
  categoryId: string;
  variants: {
    colors: string[];
    sizes: string[];
  };
  // productStock: number;
};

type OrderContextType = {
  newProductData: TProductData;
  handleFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setNewProductData: React.Dispatch<React.SetStateAction<TProductData>>;
  resetProductData: () => void;
  debouncedProductData: TProductData;
  variants: TVariantsState[];
  setVariants: React.Dispatch<React.SetStateAction<TVariantsState[]>>;
};

export const ProductContext = createContext<OrderContextType | null>(null);

const INITIAL_STATE: TProductData = {
  productName: "",
  productPrice: 0,
  productDesc: "",
  productImg: "",
  categoryId: "",
  variants: {
    colors: [],
    sizes: [],
  },
  // productStock: 0,
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newProductData, setNewProductData] =
    useState<TProductData>(INITIAL_STATE);
  const [variants, setVariants] = useState<TVariantsState[]>([]);

  useEffect(() => {
    const generatedVariants = newProductData.variants.colors.flatMap(
      (color_id) =>
        newProductData.variants.sizes.map((size_id) => ({
          color_id,
          size_id,
          stock: 0,
        }))
    );

    setVariants(generatedVariants);
  }, [newProductData.variants.colors, newProductData.variants.sizes]);

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
    variants,
    // Functions
    setNewProductData,
    handleFieldChange,
    resetProductData,
    setVariants,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
