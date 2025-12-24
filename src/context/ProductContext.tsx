import { createContext } from "use-context-selector";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type TVariant = { color_id: string; size_id: string; stock: number };

type TColorSelection = {
  color_id: string;
  sizes_id: string[];
};

export type TProductData = {
  productName: string;
  productPrice: number;
  productDesc: string;
  productImg: string | File;
  categoryId: string;
  variants: {
    selections: TColorSelection[];
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

  variants: TVariant[];
  setVariants: React.Dispatch<React.SetStateAction<TVariant[]>>;
};

export const ProductContext = createContext<OrderContextType | null>(null);

const INITIAL_STATE: TProductData = {
  productName: "",
  productPrice: 0,
  productDesc: "",
  productImg: "",
  categoryId: "",
  variants: {
    selections: [],
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
  const [variants, setVariants] = useState<TVariant[]>([]);

  useEffect(() => {
    setVariants((prev) => {
      // Preserve Stock if Varian Already Exists
      const existingMap = new Map(
        prev.map((v) => [`${v.color_id}-${v.size_id}`, v])
      );

      return newProductData.variants.selections.flatMap(
        ({ color_id, sizes_id }) =>
          sizes_id.map((size_id) => {
            const key = `${color_id}-${size_id}`;

            return (
              existingMap.get(key) ?? {
                color_id,
                size_id,
                stock: 0,
              }
            );
          })
      );
    });
  }, [newProductData.variants.selections]);

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
