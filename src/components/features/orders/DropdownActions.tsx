import React from "react";
import { AppContext } from "@/context/AppContext";
import { useContextSelector } from "use-context-selector";
import { OrdersContext } from "@/context/OrdersContext";

type Props = {
  openOrderTrackingPopup: () => void;
  setDropdownActions: React.Dispatch<React.SetStateAction<string | null>>;
  status: string;
};

const DropdownActions = ({
  openOrderTrackingPopup,
  setDropdownActions,
  status,
}: Props) => {
  const setIsDialogOpen = useContextSelector(
    AppContext,
    (ctx) => ctx?.setIsDialogOpen
  );
  const setReturnPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.setReturnPopup
  );

  const handleTrackingPopup = () => {
    if (status === "cancelled" || status === "returned") {
      setIsDialogOpen?.(true);
      return;
    }
    openOrderTrackingPopup();
    setDropdownActions(null);
  };
  const handleCancelOrder = () => {
    setIsDialogOpen?.(true);
  };
  const handleReturnOrder = async () => {
    if (status !== "delivered") {
      setIsDialogOpen?.(true);
      return;
    }

    setReturnPopup?.(true);
  };

  const isDisabled = status !== "paid";

  return (
    <div className="absolute top-12 left-1/2 rounded-xl bg-neutral w-38 z-20 py-2 px-2 shadow-lg">
      <ul className="flex flex-col gap-1">
        <li
          className={`text-sm ${
            isDisabled
              ? "text-gray-400"
              : "hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150"
          } text-right`}
        >
          <button
            className={`text-sm ${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            } w-full text-right px-2 py-2`}
            onClick={isDisabled ? undefined : handleCancelOrder}
            disabled={isDisabled}
          >
            إلغاء الطلب
          </button>
        </li>
        <li className="text-sm hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer w-full text-right px-2 py-2"
            onClick={handleTrackingPopup}
          >
            تتبع الطلب
          </button>
        </li>
        {["delivered", "return", "returned"].includes(status) && (
          <li
            className={`text-sm ${
              status === "return" || status === "returned"
                ? "text-gray-400"
                : "hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150"
            } text-right`}
          >
            <button
              className={`text-sm ${
                status === "return" || status === "returned"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } w-full text-right px-2 py-2`}
              onClick={
                status === "return" || status === "returned"
                  ? undefined
                  : handleReturnOrder
              }
              disabled={status === "return" || status === "returned"}
            >
              {status === "return"
                ? "قيد المعالجة"
                : status === "returned"
                ? "تم الاسترجاع"
                : "إرجاع الطلب"}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default React.memo(DropdownActions);
