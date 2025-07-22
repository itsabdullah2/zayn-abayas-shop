import type { VariantsTableType } from "@/supabase/types";

export interface ProductType {
  id: string;
  product_name: string;
  product_desc: string;
  product_img: string;
  category_id: string;
  available: boolean;
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
