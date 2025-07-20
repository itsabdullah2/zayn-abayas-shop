import useCartData from "@/hooks/useCartData";
import React from "react";

const CartBtns = ({ productId }: { productId: string }) => {
  const { handleCart } = useCartData();
  return (
    <div className="flex items-center gap-3 w-full pb-5 border-b border-soft-gray">
      <button className="flex-1 border border-primary text-primary font-medium rounded-none px-3 h-auto py-1 text-[15px] hover:bg-primary hover:text-neutral duration-200 cursor-pointer">
        Buy now
      </button>
      <button
        className="flex-1 border border-primary primary-btn rounded-none! px-3! h-auto! py-1 text-[15px] relative overflow-hidden group cursor-pointer"
        onClick={() => handleCart?.(productId)}
      >
        Add to cart
        <span className="shine-effect group-hover:animate-shine" />
      </button>
    </div>
  );
};

export default React.memo(CartBtns);
