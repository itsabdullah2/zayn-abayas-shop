// import React from "react";
import { FaBox, FaAward } from "react-icons/fa";
import { BsClipboard2CheckFill, BsClipboard2XFill } from "react-icons/bs";

export default function DashboardUpperBoxes() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="border border-gray-400 py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-light-gray hover:shadow-xl duration-200">
        <div className="bg-gray-300 w-11 h-11 flex-center rounded-full">
          <FaBox size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">إجمالي المنتجات</h3>
          <span className="text-[15px] text-gray">240</span>
        </div>
      </div>
      <div className="border border-gray-400 py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-light-gray hover:shadow-xl duration-200">
        <div className="bg-gray-300 w-11 h-11 flex-center rounded-full">
          <BsClipboard2CheckFill size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">طلبات مكتملة</h3>
          <span className="text-[15px] text-gray">240</span>
        </div>
      </div>
      <div className="border border-gray-400 py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-light-gray hover:shadow-xl duration-200">
        <div className="bg-gray-300 w-11 h-11 flex-center rounded-full">
          <BsClipboard2XFill size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">طلبات ملغية</h3>
          <span className="text-[15px] text-gray">240</span>
        </div>
      </div>
      <div className="border border-gray-400 py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-light-gray hover:shadow-xl duration-200">
        <div className="bg-gray-300 w-11 h-11 flex-center rounded-full">
          <FaAward size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">الأكثر طلباً</h3>
          <span className="text-[15px] text-gray">240</span>
        </div>
      </div>
    </div>
  );
}
