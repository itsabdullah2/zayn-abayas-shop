export interface ProductType {
  id: string;
  product_name: string;
  product_desc: string;
  product_price: number;
  product_img: string;
  category_id: string;
  available: boolean;
  create_at: Date;
}

export interface CartItemType {
  id?: string;
  user_id?: string;
  product_id: string;
  quantity: number;
  created_at?: Date;
}
