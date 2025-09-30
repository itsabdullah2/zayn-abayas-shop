import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  isNavMenu: boolean;
  searchPopup: boolean;
  productPopup: string | null;
  selectedCategory: string;
  // Functions
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSearchPopup: () => void;
  handleOpenSearchPopup: () => void;
  closeProductPopup: () => void;
  openProductPopup: (id: string) => void;
  handleSelectedCategory: (filter: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);
  const [searchPopup, setSearchPopup] = useState<boolean>(false);
  const [productPopup, setProductPopup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSelectedCategory = (filter: string) => {
    setSelectedCategory(filter);
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

  const value: AppContextType = {
    // States
    isNavMenu,
    searchPopup,
    productPopup,
    selectedCategory,
    // Functions
    setIsNavMenu,
    handleCloseSearchPopup,
    handleOpenSearchPopup,
    closeProductPopup,
    openProductPopup,
    handleSelectedCategory,
    isDialogOpen,
    setIsDialogOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
