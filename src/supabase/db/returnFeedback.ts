import { supabase } from "../client";
import type { ReturnFeedback } from "../types";

export const getReturnFeedback = async (): Promise<ReturnFeedback[]> => {
  try {
    const { data, error } = await supabase.from("return_feedback").select("*");

    if (error) {
      console.error("Failed to get return feedback:", error.message);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error("Failed to get return feedback:", err);
    throw err;
  }
};

type TFeedbackData = Omit<ReturnFeedback, "created_at" | "id">;
// type TFeedbackData = Partial<Omit<ReturnFeedback, "created_at" | "id">> &
// Pick<ReturnFeedback, "user_id"| "product_id" | "order_id">

export const createReturnFeedback = async (
  feedbackData: TFeedbackData
): Promise<ReturnFeedback[]> => {
  const {
    user_id,
    order_id,
    product_id,
    rating,
    reason,
    tried,
    exchange,
    notes,
    delivery_speed,
  } = feedbackData;

  try {
    const { data, error } = await supabase
      .from("return_feedback")
      .insert({
        user_id,
        order_id,
        product_id,
        notes,
        exchange,
        tried,
        rating,
        reason,
        delivery_speed,
      })
      .select();

    if (error) {
      console.error(
        "Failed to create the feedback, Please try again!",
        error.message
      );
    }

    return data || [];
  } catch (err) {
    console.error("Something went wrong!", err);
    throw err;
  }
};
