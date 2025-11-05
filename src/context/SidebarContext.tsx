import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggle: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isSidebarOpen");
      if (saved !== null) return JSON.parse(saved);
      // Default based on screen size
      return window.innerWidth > 650;
    }
    return true;
  });

  const handleToggle = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("isSidebarOpen", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      // Only auto-close on mobile of currently open
      if (window.innerWidth <= 640 && isOpen) {
        setIsOpen(false);
        localStorage.setItem("isSidebarOpen", JSON.stringify(false));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values: SidebarContextType = {
    isOpen,
    setIsOpen,
    handleToggle,
  };
  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};
