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
