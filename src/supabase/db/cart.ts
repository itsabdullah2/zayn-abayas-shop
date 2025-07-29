import { supabase } from "../";

export const clearCart = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Error clearing the cart:", error.message);
    }
  } catch (err) {
    console.error("Failed to clear the cart:", err);
  }
};
