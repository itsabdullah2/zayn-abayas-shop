import type { EnrichedCartItem } from "@/types";
import { supabase } from "../";
import type { FullOrder, OrderItem } from "../types";

export const createOrder = async ({
  userId,
  totalPrice,
  items,
}: {
  userId: string;
  totalPrice: number;
  items: EnrichedCartItem[];
}) => {
  try {
    // step 1: Insert the order to orders table
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_price: totalPrice,
      })
      .select()
      .single();

    if (orderError || !order) throw orderError;

    // step 2: insert the order to the order items table
    const orderItems: Omit<OrderItem, "id" | "created_at">[] = items.map(
      (item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        order_id: order.id,
        order_price: item.price,
      })
    );

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // Rollback the order if inserting items failed
      await supabase.from("orders").delete().eq("id", order.id);
      throw itemsError;
    }

    return order;
  } catch (err) {
    console.error("Error creating order:", err);
    return null;
  }
};

export const updateOrderStatus = async (
  status: string,
  orderId: string,
  userId: string
) => {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error while updating status:", err);
    return false;
  }
};

export const cancelOrder = async (orderId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: "canceled" }) // or use .delete() if you prefer to remove it
      .eq("id", orderId)
      .eq("user_id", userId);

    if (error) {
      console.error("Cancel order error:", error.message);
      throw error;
    }
  } catch (err) {
    console.error("Failed to cancel order:", err);
  }
};

export const getUserOrders = async (userId: string): Promise<FullOrder[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `*,
      order_items(
        id,
        quantity,
        order_price,
        product:product_id (
          id,
          product_name,
          product_desc,
          product_img,
          product_price
        )
      )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch orders:", error);
      return [];
    }

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
