import React from "react";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { updateOrderStatus } from "@/supabase";
import type { FullOrder } from "@/supabase/types";
import { useContextSelector } from "use-context-selector";

type Props = {
  openOrderTrackingPopup: () => void;
  setDropdownActions: React.Dispatch<React.SetStateAction<string | null>>;
  status: string;
  order: FullOrder;
};

const DropdownActions = ({
  openOrderTrackingPopup,
  setDropdownActions,
  status,
  order,
}: Props) => {
  const setIsDialogOpen = useContextSelector(
    AppContext,
    (ctx) => ctx?.setIsDialogOpen
  );
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);
  const handleTrackingPopup = () => {
    if (status === "cancelled") {
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
    const userId = user?.id;
    if (status === "cancelled") {
      setIsDialogOpen?.(true);
      return;
    }

    if (userId) await updateOrderStatus("refund", order.id, userId);
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
        <li
          className={`text-sm ${
            status === "refund" || status === "refunded"
              ? "text-gray-400"
              : "hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150"
          } text-right`}
        >
          <button
            className={`text-sm ${
              status === "refund" || status === "refunded"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } w-full text-right px-2 py-2`}
            onClick={handleReturnOrder}
            disabled={status === "refund" || status === "refunded"}
          >
            {status === "refund"
              ? "قيد المعالجة"
              : status === "refunded"
              ? "تم الاسترجاع"
              : "إرجاع الطلب"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(DropdownActions);
