import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  theme: string;
  handleTheme: () => void;
  isNavMenu: boolean;
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  searchPopup: boolean;
  handleCloseSearchPopup: () => void;
  handleOpenSearchPopup: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);
  const [searchPopup, setSearchPopup] = useState<boolean>(false);

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCloseSearchPopup = useCallback(() => {
    setSearchPopup(false);
  }, []);
  const handleOpenSearchPopup = () => {
    setSearchPopup(true);
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

  const value = {
    // States
    theme,
    isNavMenu,
    searchPopup,
    // Functions
    handleTheme,
    setIsNavMenu,
    handleCloseSearchPopup,
    handleOpenSearchPopup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
