import { useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  theme: string;
  handleTheme: () => void;
  isNavMenu: boolean;
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    handleTheme,
    isNavMenu,
    setIsNavMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
