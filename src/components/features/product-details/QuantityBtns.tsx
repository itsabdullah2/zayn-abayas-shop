import useCartData from "@/hooks/useCartData";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityBtns = ({ productId }: { productId: string }) => {
  const {
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    getProductQuantity,
    handleCart,
  } = useCartData();

  return (
    <div className="flex items-center gap-4">
      <button
        className="h-8 w-8 flex-center rounded bg-light-gray cursor-pointer text-xs"
        onClick={() => handleDecreaseQuantity?.(productId)}
      >
        <FaMinus />
      </button>
      <h4 className="text-primary text-sm md:text-[1.0625rem]">
        {getProductQuantity(productId)}
      </h4>
      <button
        className="h-8 w-8 flex-center rounded bg-light-gray cursor-pointer text-xs"
        onClick={() => {
          handleCart?.(productId);
          handleIncreaseQuantity?.(productId);
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityBtns;
