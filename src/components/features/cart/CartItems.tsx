import type { EnrichedProductType } from "@/types";
import CartItem from "./CartItem";

const CartItems = ({ items }: { items: EnrichedProductType[] }) => {
  return items.map((item) => <CartItem key={item.id} item={item} />);
};

export default CartItems;
