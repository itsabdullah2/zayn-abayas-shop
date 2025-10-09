import { OrdersContext } from "@/context/OrdersContext";
import { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useContextSelector } from "use-context-selector";

const sharedStyles =
  "cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white";

const ReturningOrderPopup = () => {
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
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-40" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 w-[95vw] md:w-[400px] lg:w-[600px] bg-white rounded-2xl py-5 px-6"
        ref={ref}
      >
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-lg font-semibold">إرجاع الطلب</h3>
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

        <div className={`flex items-center justify-between gap-3`}>
          <button
            className={`${sharedStyles}`}
            onClick={() => setReturnPopup?.(false)}
          >
            الغاء
          </button>

          <button className={`${sharedStyles}`}>تأكيد</button>
        </div>
      </div>
    </>
  );
};

export default ReturningOrderPopup;
