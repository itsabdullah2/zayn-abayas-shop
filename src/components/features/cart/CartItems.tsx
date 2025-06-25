import type { ProductType } from "@/types";
import CartItem from "./CartItem";

const CartItems = ({ items }: { items: ProductType[] }) => {
  return (
    // <div className="">
    items.map((item) => <CartItem key={item.id} item={item} />)
    // </div>
  );
};

export default CartItems;
