import useCartData from "@/hooks/useCartData";
import { getColors, getSizes } from "@/supabase";
import type { ColorsAndSizesType } from "@/supabase/types";
import type { EnrichedProductType } from "@/types";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CartItem = ({ item }: { item: EnrichedProductType }) => {
  const [color, setColor] = useState<ColorsAndSizesType | null>(null);
  const [size, setSize] = useState<ColorsAndSizesType | null>(null);
  const {
    getProductTotalPrice,
    getProductQuantity,
    handleRemoveProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useCartData();

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const [cRes, sRes] = await Promise.all([
          getColors(item.color_id),
          getSizes(item.size_id),
        ]);
        setColor(cRes[0]);
        setSize(sRes[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchColor();
  }, [item.color_id, item.size_id]);

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
          ج.م {item.price}
        </h4>
        <div className="gap-2 col-span-1 flex-center">
          <button
            className="h-4 w-4 md:h-6 md:w-6 flex-center rounded md:rounded-md border border-gray cursor-pointer text-xs"
            onClick={() => handleDecreaseQuantity?.(item.id)}
          >
            <FaMinus />
          </button>
          <h4 className="text-primary text-sm md:text-[1.0625rem]">
            {getProductQuantity(item.id)}
          </h4>
          <button
            className="h-4 w-4 md:h-6 md:w-6 flex-center rounded md:rounded-md border border-gray cursor-pointer text-xs"
            onClick={() => handleIncreaseQuantity?.(item.id)}
          >
            <FaPlus />
          </button>
        </div>
        <h4 className="col-span-1 font-medium text-sm md:text-[15px] text-accentB text-center flex-center">
          ج.م {getProductTotalPrice(item.id)}
        </h4>
        <button
          className="text-text hover:text-red-600 duration-200 font-medium bottom-0 md:bottom-auto left-0 md:top-1/2 md:-translate-y-1/2 absolute cursor-pointer"
          onClick={() => handleRemoveProduct?.(item.id)}
        >
          <FaTrashAlt size={16} />
        </button>

        <div className="flex items-center gap-3 absolute -bottom-2 md:bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            <span>اللون:</span>
            <span>{color?.name === "white" ? "أبيض" : "أسود"}</span>
          </div>
          <div className="flex gap-1">
            <span>المقاس:</span>
            <span>{size?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
