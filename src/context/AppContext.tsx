import { useState } from "react";
import { createContext } from "use-context-selector";

type AppContextType = {
  theme: string;
  handleTheme: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    handleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
