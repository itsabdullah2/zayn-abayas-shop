import { useEffect, useMemo, useState } from "react";
import { createContext } from "use-context-selector";
import {
  createCartItem,
  decreaseCartItemQuantity,
  getCartItems,
  increaseCartItemQuantity,
  removeItem,
} from "@/supabase/db/products";
import type { CartItemType, EnrichedProductType } from "@/types";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "./AuthContext";
import {
  getGuestCart,
  addToGuestCart,
  removeFromGuestCart,
  updateGuestCartItemQuantity,
  migrateGuestCartToUser,
} from "@/utils/localStorage";
import { toast } from "sonner";

interface CartContextType {
  cartProducts: EnrichedProductType[];
  variantsIds: string[];
  cartVersion: number;
  cartItems: CartItemType[];
  totalPrice: number;
  // Functions
  setCartProducts: React.Dispatch<React.SetStateAction<EnrichedProductType[]>>;
  handleRemoveProduct: (id: string) => void;
  setVariantsIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleCart: (productId: string) => void;
  incrementCartVersion: () => void;
  handleIncreaseQuantity: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<EnrichedProductType[]>([]);
  const [variantsIds, setVariantsIds] = useState<string[]>([]);
  const [cartVersion, setCartVersion] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [hasMigratedCart, setHasMigratedCart] = useState<boolean>(false);

  // Get authentication state
  const { user, isAuthenticated, loading } = useContextSelector(
    AuthContext,
    (ctx) => ctx || { user: null, isAuthenticated: false, loading: true }
  );

  // Handle cart migration when user logs in
  useEffect(() => {
    if (isAuthenticated && user && !hasMigratedCart) {
      const migrateCart = async () => {
        try {
          await migrateGuestCartToUser(user.id, createCartItem);
          setHasMigratedCart(true);
          incrementCartVersion(); // Refresh cart data
        } catch (error) {
          console.error("Failed to migrate cart:", error);
        }
      };

      migrateCart();
    }
  }, [isAuthenticated, user, hasMigratedCart]);

  // Reset migration flag when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setHasMigratedCart(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (isAuthenticated && user) {
          // Fetch from database for authenticated users
          const data = await getCartItems({
            eqCol: "user_id",
            eqVal: user.id,
          });
          const ids = data.map((item) => item.variant_id);
          setVariantsIds(ids);
          setCartItems(data);
        } else if (!loading) {
          // Load from localStorage for guest users
          const guestCart = getGuestCart();
          const ids = guestCart.map((item) => item.variant_id);
          setVariantsIds(ids);
          setCartItems(guestCart);
        }
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, [isAuthenticated, user, loading, cartVersion]);

  const incrementCartVersion = () => setCartVersion((v) => v + 1);

  const handleRemoveProduct = async (id: string) => {
    try {
      if (isAuthenticated && user) {
        // Remove from database for authenticated users
        await removeItem(id, user.id);
      } else {
        // Remove from localStorage for guest users
        removeFromGuestCart(id);
      }
      incrementCartVersion();
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncreaseQuantity = async (id: string) => {
    try {
      if (isAuthenticated && user) {
        // Update in database for authenticated users
        await increaseCartItemQuantity(id, user.id);
      } else {
        // Update in localStorage for guest users
        const currentCart = getGuestCart();
        const item = currentCart.find((cartItem) => cartItem.variant_id === id);
        if (item) {
          updateGuestCartItemQuantity(id, item.quantity + 1);
        }
      }
      incrementCartVersion();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecreaseQuantity = async (id: string) => {
    try {
      if (isAuthenticated && user) {
        // Update in database for authenticated users
        await decreaseCartItemQuantity(id, user.id);
      } else {
        // Update in localStorage for guest users
        const currentCart = getGuestCart();
        const item = currentCart.find((cartItem) => cartItem.variant_id === id);
        if (item) {
          updateGuestCartItemQuantity(id, item.quantity - 1);
        }
      }
      incrementCartVersion();
    } catch (err) {
      console.error(err);
    }
  };

  // Wrap the function with useCallback if needed
  const handleCart = async (variantId: string) => {
    try {
      if (isAuthenticated && user) {
        // Add to database for authenticated users
        await createCartItem({
          user_id: user.id,
          variant_id: variantId,
          quantity: 1,
        });
      } else {
        // Add to localStorage for guest users
        addToGuestCart(variantId, 1);
      }

      setVariantsIds((prev: string[]) =>
        prev.includes(variantId) ? prev : [...prev, variantId]
      );

      incrementCartVersion();
      toast.success("تمت إضافة المنتج إلى السلة", {
        description: "يمكنك عرضه في صفحة السلة",
        className: "bg-primary! text-neutral! w-fit!",
        descriptionClassName: "text-text!",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = useMemo(() => {
    if (!cartItems || !cartProducts) return 0;

    return cartItems.reduce((sum, item) => {
      const product = cartProducts.find((p) => p.id === item.variant_id);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
  }, [cartItems, cartProducts]);

  const values: CartContextType = {
    cartProducts,
    variantsIds,
    cartVersion,
    cartItems,
    totalPrice,
    // Functions
    setCartProducts,
    handleRemoveProduct,
    setVariantsIds,
    handleCart,
    incrementCartVersion,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
