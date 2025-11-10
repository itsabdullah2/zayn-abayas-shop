import type { ProductType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "use-context-selector";

type TEditingData = {
  productImg: string | File;
  productName: string;
  productDesc: string;
  productPrice: number;
};
type AppContextType = {
  isNavMenu: boolean;
  searchPopup: boolean;
  productPopup: string | null;
  selectedCategory: string;
  isEditPopupForm: string | null;
  editingData: TEditingData;
  // Functions
  setIsNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSearchPopup: () => void;
  handleOpenSearchPopup: () => void;
  closeProductPopup: () => void;
  openProductPopup: (id: string) => void;
  handleSelectedCategory: (filter: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditPopupForm: React.Dispatch<React.SetStateAction<string | null>>;
  handleCancel: () => void;
  handleSubmitEdits: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEditFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleEditClick: (product: ProductType) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_STATE = {
  productImg: "",
  productName: "",
  productDesc: "",
  productPrice: 0,
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavMenu, setIsNavMenu] = useState<boolean>(false);
  const [searchPopup, setSearchPopup] = useState<boolean>(false);
  const [productPopup, setProductPopup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // States & functions of Admin products page
  const [isEditPopupForm, setIsEditPopupForm] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<TEditingData>(INITIAL_STATE);

  const handleSubmitEdits = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("The Edited Data is:", editingData);
  };
  const handleEditClick = (product: ProductType) => {
    setEditingData({
      productImg: product.product_img,
      productName: product.product_name,
      productDesc: product.product_desc,
      productPrice: product.product_price,
    });

    setIsEditPopupForm(product.id);
  };
  const handleCancel = () => {
    setIsEditPopupForm(null);
    setEditingData(INITIAL_STATE);
    toast.success("تم حذف المنتج بنجاح");
  };
  const handleEditFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];
      if (!file) return;
      // Upload the new image to Supabase bucket and get the public url

      setEditingData((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    setEditingData((prev) => ({ ...prev, [name]: value }));
  };
  // End of States & functions of Admin products page

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
    isEditPopupForm,
    editingData,
    // Functions
    setIsNavMenu,
    handleCloseSearchPopup,
    handleOpenSearchPopup,
    closeProductPopup,
    openProductPopup,
    handleSelectedCategory,
    isDialogOpen,
    setIsDialogOpen,
    setIsEditPopupForm,
    handleCancel,
    handleSubmitEdits,
    handleEditFieldChange,
    handleEditClick,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
