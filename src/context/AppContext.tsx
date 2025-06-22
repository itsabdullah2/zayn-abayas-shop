import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  isNavMenu: boolean;
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  searchPopup: boolean;
  handleCloseSearchPopup: () => void;
  handleOpenSearchPopup: () => void;
  closeProductPopup: () => void;
  openProductPopup: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);
  const [searchPopup, setSearchPopup] = useState<boolean>(false);
  const [productPopup, setProductPopup] = useState<boolean>(false);

  const handleCloseSearchPopup = useCallback(() => {
    setSearchPopup(false);
  }, []);
  const handleOpenSearchPopup = () => {
    setSearchPopup(true);
  };

  const closeProductPopup = () => {
    setProductPopup(false);
  };
  const openProductPopup = () => {
    setProductPopup(true);
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

  const value = {
    // States
    isNavMenu,
    searchPopup,
    productPopup,
    // Functions
    setIsNavMenu,
    handleCloseSearchPopup,
    handleOpenSearchPopup,
    closeProductPopup,
    openProductPopup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
