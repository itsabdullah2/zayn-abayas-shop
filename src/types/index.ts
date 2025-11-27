import type { VariantsTableType } from "@/supabase/types";

export interface ProductType {
  id: string;
  product_name: string;
  product_desc: string;
  product_img: string | File;
  category_id: string;
  product_price: number;
  available: boolean;
  is_best_seller: boolean;
  create_at?: Date;
}

export interface CartItemType {
  id?: string;
  user_id?: string;
  variant_id: string;
  quantity: number;
  created_at?: Date;
}

export type EnrichedProductType = VariantsTableType & {
  product_name?: string;
  product_desc?: string;
  product_img?: string;
  category_id?: string;
  available?: boolean;
};

export type EnrichedCartItem = {
  variant_id: string;
  product_id: string;
  color_id: string;
  size_id: string;
  quantity: number;
  price: number;
  stock: number;
};
