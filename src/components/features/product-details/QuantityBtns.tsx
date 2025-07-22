import useCartData from "@/hooks/useCartData";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityBtns = ({ variantId }: { variantId: string }) => {
  const {
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    getProductQuantity,
    handleCart,
    variantsIds,
  } = useCartData();

  return (
    <div className="flex items-center gap-4">
      <button
        className="h-8 w-8 flex-center rounded bg-light-gray cursor-pointer text-xs"
        onClick={() => handleDecreaseQuantity?.(variantId)}
      >
        <FaMinus />
      </button>
      <h4 className="text-primary text-sm md:text-[1.0625rem]">
        {getProductQuantity(variantId)}
      </h4>
      <button
        className="h-8 w-8 flex-center rounded bg-light-gray cursor-pointer text-xs"
        onClick={() => {
          if (variantsIds?.includes(variantId)) {
            handleIncreaseQuantity?.(variantId);
          } else {
            handleCart?.(variantId);
          }
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default React.memo(QuantityBtns);
