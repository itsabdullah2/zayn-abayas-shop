import useCartData from "@/hooks/useCartData";
import type { ProductType } from "@/types";
import { FaTrashAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CartItem = ({ item }: { item: ProductType }) => {
  const {
    getProductTotalPrice,
    getProductQuantity,
    handleRemoveProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useCartData();

  return (
    <div className="grid grid-cols-6 even:border-y even:border-gray even:py-5 even:my-5">
      <div className="col-span-3 w-[150px]">
        <img
          src={item.product_img}
          alt={item.product_name}
          className="w-full rounded-xl"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 relative">
        <h4 className="col-span-1 font-medium text-[0.9375rem] text-primary flex-center">
          {item.product_price} E.L
        </h4>
        <div className="gap-2 col-span-1 flex-center">
          <button
            className="h-6 w-6 flex-center rounded-md border border-gray cursor-pointer"
            onClick={() =>
              handleDecreaseQuantity && handleDecreaseQuantity(item.id)
            }
          >
            <FaMinus />
          </button>
          <h4>{getProductQuantity(item.id)}</h4>
          <button
            className="h-6 w-6 flex-center rounded-md border border-gray cursor-pointer"
            onClick={() =>
              handleIncreaseQuantity && handleIncreaseQuantity(item.id)
            }
          >
            <FaPlus />
          </button>
        </div>
        <h4 className="col-span-1 font-medium text-[0.9375rem] text-accentB text-center flex-center">
          {getProductTotalPrice(item.id)} E.L
        </h4>
        <button
          className="text-text hover:text-red-600 duration-200 font-medium right-0 top-1/2 -translate-y-1/2 absolute cursor-pointer"
          onClick={() => handleRemoveProduct && handleRemoveProduct(item.id)}
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
