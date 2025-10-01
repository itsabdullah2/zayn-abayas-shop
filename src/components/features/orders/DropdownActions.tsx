import { AppContext } from "@/context/AppContext";
// import { OrdersContext } from "@/context/OrdersContext";
import React from "react";
import { useContextSelector } from "use-context-selector";

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
  // const {orderCancellation, setOrderCancellation} = useContextSelector(OrdersContext, (ctx) => ({
  //   orderCancellation: ctx?.orderCancellation,
  //   setOrderCancellation: ctx?.setOrderCancellation
  // }));
  const setIsDialogOpen = useContextSelector(
    AppContext,
    (ctx) => ctx?.setIsDialogOpen
  );
  const handleTrackingPopup = () => {
    openOrderTrackingPopup();
    setDropdownActions(null);
  };
  const handleCancelOrder = () => {
    setIsDialogOpen?.(true);
  };
  const handleReturnOrder = () => {};
  const handlePrint = () => {};

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
        <li className="text-sm hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer w-full text-right px-2 py-2"
            onClick={handleReturnOrder}
          >
            إرجاع الطلب
          </button>
        </li>
        <li className="text-sm hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer w-full text-right px-2 py-2"
            onClick={handlePrint}
          >
            طباعة
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(DropdownActions);
