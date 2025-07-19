import { supabase } from "../";
import type { ReviewLikesTableType, ReviewsTableType } from "../types";

export const getReviews = async (
  productId: string
): Promise<ReviewsTableType[]> => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId);

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

type InsertReview = Omit<ReviewsTableType, "id" | "created_at">;

export const addReview = async (
  options: InsertReview
): Promise<ReviewsTableType> => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert(options)
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateReview = async (
  comment: string,
  rating: number,
  userId: string,
  productId: string
): Promise<ReviewsTableType> => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .update({ comment, rating })
      .eq("product_id", productId)
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLikes = async (
  review_id: string
): Promise<ReviewLikesTableType[]> => {
  try {
    const { data, error } = await supabase
      .from("review-likes")
      .select("*")
      .eq("review_id", review_id);

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addLike = async (
  user_id: string,
  review_id: string,
  likes: number
): Promise<ReviewLikesTableType> => {
  try {
    const { data, error } = await supabase
      .from("review-likes")
      .insert({
        user_id,
        review_id,
        likes,
      })
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteLike = async (
  user_id: string,
  review_id: string
): Promise<ReviewLikesTableType> => {
  try {
    const { data, error } = await supabase
      .from("review-likes")
      .delete()
      .eq("user_id", user_id)
      .eq("review_id", review_id)
      .single();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
