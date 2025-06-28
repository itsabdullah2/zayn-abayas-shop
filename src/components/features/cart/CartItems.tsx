import type { ProductType } from "@/types";
import CartItem from "./CartItem";

const CartItems = ({ items }: { items: ProductType[] }) => {
  return items.map((item) => <CartItem key={item.id} item={item} />);
};

export default CartItems;
