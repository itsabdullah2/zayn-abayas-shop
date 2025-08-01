import React from "react";

type Props = {
  openOrderTrackingPopup: () => void;
};

const DropdownActions = ({ openOrderTrackingPopup }: Props) => {
  return (
    <div className="absolute top-8 left-1/2 rounded-xl bg-neutral w-38 z-50 py-2 px-2 shadow-lg">
      <ul className="flex flex-col gap-1">
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary hover:pr-1 rounded-md w-full duration-150 text-right">
          <button className="text-sm cursor-pointer">إلغاء الطلب</button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary hover:pr-1 rounded-md w-full duration-150 text-right">
          <button
            className="text-sm cursor-pointer"
            onClick={openOrderTrackingPopup}
          >
            تتبع الطلب
          </button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary hover:pr-1 rounded-md w-full duration-150 text-right">
          <button className="text-sm cursor-pointer">إرجاع الطلب</button>
        </li>
        <li className="text-sm px-2 py-2 hover:bg-light-gray text-text hover:text-primary hover:pr-1 rounded-md w-full duration-150 text-right">
          <button className="text-sm cursor-pointer">طباعة</button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(DropdownActions);
