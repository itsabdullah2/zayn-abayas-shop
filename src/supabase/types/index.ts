import type { User, Session } from "@supabase/supabase-js";

export type SigningResult = {
  user: User | null;
  session?: Session | null;
};

export type CategoriesTableType = {
  id: string;
  category: string;
  created_at: Date;
};

export type UserTableType = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

export type ReviewsTableType = {
  id: string;
  product_id: string;
  user_id: string;
  comment: string;
  rating: number;
  create_at?: Date;
};

export type ReviewLikesTableType = {
  id?: string;
  user_id: string;
  review_id: string;
  created_at?: Date;
};

export type VariantsTableType = {
  id: string;
  product_id: string;
  color_id: string;
  size_id: string;
  price: number;
  created_at: Date;
};
export type ColorsAndSizesType = {
  id: string;
  name: string;
};
