import type { EnrichedCartItem } from "@/types";
import { supabase } from "../";
import type {
  FullOrder,
  OrderItem,
  TOrdersTable,
  TTopProducts,
} from "../types";

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
      }),
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
  userId?: string,
  isAdmin: boolean = false,
) => {
  try {
    let query = supabase.from("orders").update({ status }).eq("id", orderId);

    if (!isAdmin && userId) {
      query = query.eq("user_id", userId);
    }

    const { error } = await query;

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
      .update({ status: "cancelled" }) // or use .delete() if you prefer to remove it
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

export const getUserOrders = async (
  userId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<FullOrder[]> => {
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
      `,
      )
      .eq("user_id", userId)
      .range(offset, offset + limit - 1)
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

export const getAllOrders = async (
  limit: number = 10,
  offset: number = 0,
): Promise<FullOrder[]> => {
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
      `,
      )
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch orders:", error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const getAllOrdersFromOrdersTableOnly = async (): Promise<
  TOrdersTable[]
> => {
  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) {
      console.error("Failed to fetch orders:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    throw err;
  }
};

export const getTopProducts = async (
  limit: number = 10,
): Promise<TTopProducts[]> => {
  try {
    // The rpc stands for Remote Procedure Call and this let's you execute functions created inside DB in PostgreSQL directly inside your frontend.
    const { data, error } = await supabase.rpc("get_top_products", {
      limit_count: limit,
    });

    if (error) {
      console.error("Failed to fetch top products:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch top products:", err);
    return [];
  }
};

export const getOrderItems = async (): Promise<OrderItem[]> => {
  try {
    const { data, error } = await supabase.from("order_items").select("*");

    if (error) {
      console.error("Failed to fetch order items:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch order items:", err);
    return [];
  }
};
