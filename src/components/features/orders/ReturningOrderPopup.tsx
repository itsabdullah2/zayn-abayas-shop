import { OrdersContext } from "@/context/OrdersContext";
import { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useContextSelector } from "use-context-selector";
import ReturnForm from "./ReturnForm";
import type { FullOrder } from "@/supabase/types";

type Prop = {
  order: FullOrder;
};

const ReturningOrderPopup = ({ order }: Prop) => {
  const ref = useRef<HTMLDivElement>(null);
  const setReturnPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.setReturnPopup
  );

  // Close on click outside or esc keyboard key
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setReturnPopup?.(false);
      }
    };
    const clickEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setReturnPopup?.(false);
      }
    };

    document.addEventListener("keydown", clickEscape);
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("keydown", clickEscape);
    };
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-40" />
      <div
        className="max-h-[500px] overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 w-[95vw] md:w-[60vw] lg:w-[800px] bg-white rounded-2xl py-5 px-6"
        ref={ref}
      >
        <div className="flex justify-between items-start mb-5">
          <button
            className="w-5 h-5 border border-soft-gray flex-center rounded cursor-pointer text-primary"
            onClick={() => setReturnPopup?.(false)}
          >
            <IoIosClose size={30} />
          </button>
        </div>

        <p className="text-center text-primary font-medium text-lg mb-7">
          هل أنت متأكد من إلغاء الطلب؟
        </p>

        <ReturnForm order={order} />
      </div>
    </>
  );
};

export default ReturningOrderPopup;
