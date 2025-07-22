import { supabase } from "../";
import type { CartItemType, ProductType } from "@/types";
import type {
  CategoriesTableType,
  ColorsAndSizesType,
  VariantsTableType,
} from "../types";

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
    if (!data) return []; // Return empty array instead of throwing error

    return data;
  } catch (err) {
    console.error("Failed to get cart items:", err);
    throw err;
  }
};

type CreateCartItemsProps = {
  user_id: string;
  variant_id: string;
  quantity: number;
};

export const createCartItem = async (options: CreateCartItemsProps) => {
  try {
    const { user_id, variant_id, quantity } = options;

    // Check if item already exists in the cart for this specific user
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("variant_id", variant_id)
      .eq("user_id", user_id)
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
            user_id,
            variant_id,
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

export const removeItem = async (variantId: string, userId: string) => {
  try {
    if (!variantId) throw new Error("Variant ID is Required");
    if (!userId) throw new Error("User ID is Required");

    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId)
      .eq("variant_id", variantId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Delete Item Error:", error);
    throw error;
  }
};

export const increaseCartItemQuantity = async (
  variantId: string,
  userId: string
) => {
  try {
    if (!variantId) throw new Error("Variant ID is Required");
    if (!userId) throw new Error("User ID is Required");

    // First, get the current cart item for this specific user
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("variant_id", variantId)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) throw new Error(fetchError.message);
    if (!existingItem) throw new Error("Cart item not found");

    // Update the quantity by incrementing it
    const { data, error: updateError } = await supabase
      .from("cart")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("variant_id", variantId)
      .eq("user_id", userId)
      .select();

    if (updateError) throw new Error(updateError.message);
    if (!data) throw new Error("Failed to update cart item quantity");

    return data;
  } catch (err) {
    console.error("Failed to increase cart item quantity:", err);
    throw err;
  }
};

export const decreaseCartItemQuantity = async (
  variantId: string,
  userId: string
) => {
  try {
    if (!variantId) throw new Error("Variant ID is Required");
    if (!userId) throw new Error("User ID is Required");

    // First, get the current cart item for this specific user
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("variant_id", variantId)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) throw new Error(fetchError.message);
    if (!existingItem) throw new Error("Cart item not found");

    // If quantity is 1, remove the item from cart
    if (existingItem.quantity <= 1) {
      return await removeItem(variantId, userId);
    }

    // Update the quantity by decrementing it
    const { data, error: updateError } = await supabase
      .from("cart")
      .update({ quantity: existingItem.quantity - 1 })
      .eq("variant_id", variantId)
      .eq("user_id", userId)
      .select();

    if (updateError) throw new Error(updateError.message);
    if (!data) throw new Error("Failed to update cart item quantity");

    return data;
  } catch (err) {
    console.error("Failed to decrease cart item quantity:", err);
    throw err;
  }
};

export const getCategories = async (): Promise<CategoriesTableType[]> => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No Categories Found!");

    return data;
  } catch (err) {
    console.error("Failed to get categories:", err);
    throw err;
  }
};

type VariantsOpts = {
  productId?: string;
  inCol?: string;
  inVal?: string[];
};

export const getVariants = async (
  options: VariantsOpts = {}
): Promise<VariantsTableType[]> => {
  try {
    const { productId, inCol, inVal } = options;
    let query = supabase.from("product_variants").select("*");

    if (productId) {
      query = query.eq("product_id", productId);
    }
    if (inCol && inVal) {
      query = query.in(inCol, inVal);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get variants ${err}`);
    throw err;
  }
};

export const getColors = async (
  colorId: string = ""
): Promise<ColorsAndSizesType[]> => {
  try {
    let query = supabase.from("colors").select("*");

    if (colorId) {
      query = query.eq("id", colorId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get colors ${err}`);
    throw err;
  }
};

export const getSizes = async (
  sizeId: string = ""
): Promise<ColorsAndSizesType[]> => {
  try {
    let query = supabase.from("sizes").select("*");

    if (sizeId) {
      query = query.eq("id", sizeId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(`Failed to get sizes ${err}`);
    throw err;
  }
};
