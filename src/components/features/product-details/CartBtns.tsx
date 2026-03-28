import CustomButton from "@/components/common/CustomButton";
import React from "react";

type Props = {
  handleAddToCart: () => void;
  handleBuyNow: () => void;
};

const CartBtns = ({ handleAddToCart, handleBuyNow }: Props) => {
  return (
    <div className="flex items-center gap-3 w-full pb-5 border-b border-soft-gray">
      <button
        className="flex-1 border border-primary text-primary font-medium rounded-none px-3 h-auto py-1 text-[15px] hover:bg-primary hover:text-neutral duration-200 cursor-pointer"
        onClick={handleBuyNow}
      >
        اشترِ الآن
      </button>
      <CustomButton
        onClick={handleAddToCart}
        className="flex-1 border border-primary rounded-none! px-3! h-auto! py-1! text-[15px]! cursor-pointer"
        btnText="أضف إلى السلة"
        btnType="primary"
      />
    </div>
  );
};

export default React.memo(CartBtns);
