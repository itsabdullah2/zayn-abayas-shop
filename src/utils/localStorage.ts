import type { CartItemType } from "@/types";

const GUEST_CART_KEY = "guest_cart";

export const getGuestCart = (): CartItemType[] => {
  try {
    const cartData = localStorage.getItem(GUEST_CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading guest cart from localStorage:", error);
    return [];
  }
};

export const setGuestCart = (cartItems: CartItemType[]): void => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving guest cart to localStorage:", error);
  }
};

export const addToGuestCart = (
  variantId: string,
  quantity: number = 1
): CartItemType[] => {
  const currentCart = getGuestCart();
  const existingItemIndex = currentCart.findIndex(
    (item) => item.variant_id === variantId
  );

  if (existingItemIndex !== -1) {
    // Update existing item quantity
    currentCart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    currentCart.push({
      id: `guest_${Date.now()}_${Math.random()}`, // Generate unique ID for guest items
      user_id: undefined, // Use undefined instead of null to match the type
      variant_id: variantId,
      quantity,
      created_at: new Date(), // Use created_at to match the interface
    });
  }

  setGuestCart(currentCart);
  return currentCart;
};

export const removeFromGuestCart = (variantId: string): CartItemType[] => {
  const currentCart = getGuestCart();
  const updatedCart = currentCart.filter(
    (item) => item.variant_id !== variantId
  );
  setGuestCart(updatedCart);
  return updatedCart;
};

export const updateGuestCartItemQuantity = (
  variantId: string,
  quantity: number
): CartItemType[] => {
  const currentCart = getGuestCart();
  const itemIndex = currentCart.findIndex(
    (item) => item.variant_id === variantId
  );

  if (itemIndex !== -1) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromGuestCart(variantId);
    } else {
      // Update quantity
      currentCart[itemIndex].quantity = quantity;
      setGuestCart(currentCart);
    }
  }

  return currentCart;
};

export const clearGuestCart = (): void => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error("Error clearing guest cart:", error);
  }
};

// Function to migrate guest cart to user cart
export const migrateGuestCartToUser = async (
  userId: string,
  createCartItemFunction: (options: {
    user_id: string;
    variant_id: string;
    quantity: number;
  }) => Promise<CartItemType[]>
): Promise<void> => {
  try {
    const guestCart = getGuestCart();

    if (guestCart.length === 0) {
      return; // No items to migrate
    }

    // Add each guest cart item to the user's database cart
    for (const item of guestCart) {
      try {
        await createCartItemFunction({
          user_id: userId,
          variant_id: item.variant_id,
          quantity: item.quantity,
        });
      } catch (error) {
        console.error(`Failed to migrate cart item ${item.variant_id}:`, error);
        // Continue with other items even if one fails
      }
    }

    // Clear the guest cart after successful migration
    clearGuestCart();
  } catch (error) {
    console.error("Failed to migrate guest cart to user cart:", error);
  }
};
