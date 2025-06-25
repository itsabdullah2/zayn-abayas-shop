import { createCartItem } from "@/supabase/db/products";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  isNavMenu: boolean;
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
  searchPopup: boolean;
  productPopup: string | null;
  handleCloseSearchPopup: () => void;
  handleOpenSearchPopup: () => void;
  closeProductPopup: () => void;
  openProductPopup: (id: string) => void;
  setProductsIds: React.Dispatch<React.SetStateAction<string[]>>;
  productsIds: string[];
  handleCart: (productId: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);
  const [searchPopup, setSearchPopup] = useState<boolean>(false);
  const [productPopup, setProductPopup] = useState<string | null>(null);

  const [productsIds, setProductsIds] = useState<string[]>([]);

  const handleCloseSearchPopup = useCallback(() => {
    setSearchPopup(false);
  }, []);
  const handleOpenSearchPopup = () => {
    setSearchPopup(true);
  };

  const closeProductPopup = () => {
    setProductPopup(null);
  };
  const openProductPopup = (id: string) => {
    setProductPopup(id);
  };

  useEffect(() => {
    const handleCloseOnPressEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseSearchPopup();
      }
    };

    document.addEventListener("keydown", handleCloseOnPressEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseOnPressEsc);
    };
  }, [handleCloseSearchPopup]);

  useEffect(() => {
    const closeProductPopupOnPressEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProductPopup();
      }
    };

    document.addEventListener("keydown", closeProductPopupOnPressEsc);
    return () => {
      document.removeEventListener("keydown", closeProductPopupOnPressEsc);
    };
  }, []);

  // Cart Functionalities
  const handleCart = async (productId: string) => {
    await createCartItem({
      user_id: null,
      product_id: productId,
      quantity: 1,
    });

    if (setProductsIds)
      setProductsIds((prev: string[]) =>
        prev.includes(productId) ? prev : [...prev, productId]
      );
  };

  const value = {
    // States
    isNavMenu,
    searchPopup,
    productPopup,
    productsIds,
    // Functions
    setIsNavMenu,
    handleCloseSearchPopup,
    handleOpenSearchPopup,
    closeProductPopup,
    openProductPopup,
    setProductsIds,
    handleCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
