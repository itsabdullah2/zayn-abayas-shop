import { supabase } from "../";
import type { CartItemType, ProductType } from "@/types";

type ProductOpts = {
  limit?: number;
  eqCol?: string;
  eqVal?: string | boolean;
  inCol?: string;
  inVal?: string[];
};

export const getProducts = async (
  options: ProductOpts = {}
): Promise<ProductType[]> => {
  try {
    const { limit, eqCol, eqVal, inCol, inVal } = options;

    let query = supabase.from("products").select("*");

    if (limit) query = query.limit(limit);
    if (eqVal && eqCol) query = query.eq(eqCol, eqVal);
    if (inCol && inVal) query = query.in(inCol, inVal);

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Products Found :(");

    return data;
  } catch (err) {
    console.error("Failed to get products:", err);
    throw err;
  }
};

export const getCartItems = async (
  options: ProductOpts = {}
): Promise<CartItemType[]> => {
  try {
    const { eqCol, eqVal } = options;

    let query = supabase.from("cart").select("*");

    if (eqCol && eqVal) query = query.eq(eqCol, eqVal);

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Cart Items Found :)");

    return data;
  } catch (err) {
    console.error("Failed to get cart items:", err);
    throw err;
  }
};

export const createCartItem = async (props: {
  user_id: string | null;
  product_id: string;
  quantity: number;
}) => {
  try {
    const { user_id, product_id, quantity } = props;

    // Check if item already exists in the cart
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("product_id", product_id)
      .maybeSingle(); // allows null if not found

    if (fetchError) throw new Error(fetchError.message);

    if (existingItem) {
      // Item exists, update the quantity
      const { data, error: updateError } = await supabase
        .from("cart")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)
        .select();

      if (updateError) throw new Error(updateError.message);
      if (!data) throw new Error("Failed to update cart item");

      return data;
    } else {
      // Item does not exist, insert new row
      const { data, error: insertError } = await supabase
        .from("cart")
        .insert([
          {
            user_id: user_id || null,
            product_id,
            quantity,
          },
        ])
        .select();

      if (insertError) throw new Error(insertError.message);
      if (!data) throw new Error("Failed to create new item");

      return data;
    }
  } catch (err) {
    console.error("Failed to create or update cart item:", err);
    throw err;
  }
};
