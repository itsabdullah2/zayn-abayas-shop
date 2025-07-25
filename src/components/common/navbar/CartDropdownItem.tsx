import useCartData from "@/hooks/useCartData";
import type { EnrichedProductType } from "@/types";
import { FaTrashAlt } from "react-icons/fa";

const CartDropdownItem = ({ item }: { item: EnrichedProductType }) => {
  const { handleRemoveProduct, getProductTotalPrice, getProductQuantity } =
    useCartData();

  return (
    <div className="flex items-center gap-4">
      <img
        src={item.product_img}
        alt={item.product_name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-medium text-primary text-[0.9rem]">
          {item.product_name}
        </h3>
        <p className="text-sm text-text">
          ج.م {getProductTotalPrice(item.id).toFixed(2)} (كمية:{" "}
          {getProductQuantity(item.id)})
        </p>
      </div>
      <button
        className="text-text hover:text-red-700 duration-200 cursor-pointer"
        onClick={() => handleRemoveProduct?.(item.id)}
        disabled={!item.id}
      >
        <FaTrashAlt size={16} />
      </button>
    </div>
  );
};

export default CartDropdownItem;
