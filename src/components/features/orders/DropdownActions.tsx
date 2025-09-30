import { AppContext } from "@/context/AppContext";
// import { OrdersContext } from "@/context/OrdersContext";
import React from "react";
import { useContextSelector } from "use-context-selector";

type Props = {
  openOrderTrackingPopup: () => void;
  setDropdownActions: React.Dispatch<React.SetStateAction<string | null>>;
};

const DropdownActions = ({
  openOrderTrackingPopup,
  setDropdownActions,
}: Props) => {
  // const {orderCancellation, setOrderCancellation} = useContextSelector(OrdersContext, (ctx) => ({
  //   orderCancellation: ctx?.orderCancellation,
  //   setOrderCancellation: ctx?.setOrderCancellation
  // }));
  const { isDialogOpen, setIsDialogOpen } = useContextSelector(
    AppContext,
    (ctx) => ({
      isDialogOpen: ctx?.isDialogOpen,
      setIsDialogOpen: ctx?.setIsDialogOpen,
    })
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

  return (
    <div className="absolute top-12 left-1/2 rounded-xl bg-neutral w-38 z-20 py-2 px-2 shadow-lg">
      <ul className="flex flex-col gap-1">
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer"
            onClick={handleCancelOrder}
            disabled={isDialogOpen}
          >
            إلغاء الطلب
          </button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer"
            onClick={handleTrackingPopup}
          >
            تتبع الطلب
          </button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer"
            onClick={handleReturnOrder}
          >
            إرجاع الطلب
          </button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary rounded-md w-full duration-150 text-right">
          <button className="text-sm cursor-pointer" onClick={handlePrint}>
            طباعة
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(DropdownActions);
