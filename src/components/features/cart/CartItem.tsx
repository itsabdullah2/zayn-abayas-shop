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
    <div className="grid grid-cols-4 xl:grid-cols-6 even:border-y even:border-gray even:py-5 even:my-5">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 w-[75px] md:w-[150px]">
        <img
          src={item.product_img}
          alt={item.product_name}
          className="w-full rounded-xl"
        />
      </div>
      <div className="col-span-3 md:col-span-2 xl:col-span-3 grid grid-cols-3 relative">
        <h4 className="col-span-1 font-medium text-sm md:text-[0.9375rem] text-primary flex-center">
          {item.product_price} E.L
        </h4>
        <div className="gap-2 col-span-1 flex-center">
          <button
            className="h-4 w-4 md:h-6 md:w-6 flex-center rounded md:rounded-md border border-gray cursor-pointer text-xs"
            onClick={() =>
              handleDecreaseQuantity && handleDecreaseQuantity(item.id)
            }
          >
            <FaMinus />
          </button>
          <h4 className="text-primary text-sm md:text-[1.0625rem]">
            {getProductQuantity(item.id)}
          </h4>
          <button
            className="h-4 w-4 md:h-6 md:w-6 flex-center rounded md:rounded-md border border-gray cursor-pointer text-xs"
            onClick={() =>
              handleIncreaseQuantity && handleIncreaseQuantity(item.id)
            }
          >
            <FaPlus />
          </button>
        </div>
        <h4 className="col-span-1 font-medium text-sm md:text-[15px] text-accentB text-center flex-center">
          {getProductTotalPrice(item.id)} E.L
        </h4>
        <button
          className="text-text hover:text-red-600 duration-200 font-medium bottom-0 md:bottom-auto right-0 md:top-1/2 md:-translate-y-1/2 absolute cursor-pointer"
          onClick={() => handleRemoveProduct && handleRemoveProduct(item.id)}
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
