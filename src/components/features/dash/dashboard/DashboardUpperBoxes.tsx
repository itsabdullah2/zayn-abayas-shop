// import React from "react";
import { FaBox, FaAward } from "react-icons/fa";
import { BsClipboard2CheckFill, BsClipboard2XFill } from "react-icons/bs";
import useOrders from "@/hooks/useOrders";
import { useTopProducts } from "@/hooks/useTopProducts";

export default function DashboardUpperBoxes() {
  const { data: orders = [] } = useOrders();
  const { data: topProducts = [] } = useTopProducts();

  const { completedCount, cancelledCount } = orders.reduce(
    (acc, order) => {
      if (order.status === "delivered") acc.completedCount++;
      if (order.status === "cancelled") acc.cancelledCount++;
      return acc;
    },
    { completedCount: 0, cancelledCount: 0 }
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-neutral/40 hover:shadow-xl duration-200">
        <div className="bg-gray-300/40 w-11 h-11 flex-center rounded-full">
          <FaBox size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">إجمالي المنتجات</h3>
          <span className="text-[15px] text-gray">{orders?.length ?? 0}</span>
        </div>
      </div>
      <div className="py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-neutral/40 hover:shadow-xl duration-200">
        <div className="bg-gray-300/40 w-11 h-11 flex-center rounded-full">
          <BsClipboard2CheckFill size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">طلبات مكتملة</h3>
          <span className="text-[15px] text-gray">{completedCount}</span>
        </div>
      </div>
      <div className="py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-neutral/40 hover:shadow-xl duration-200">
        <div className="bg-gray-300/40 w-11 h-11 flex-center rounded-full">
          <BsClipboard2XFill size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">طلبات ملغية</h3>
          <span className="text-[15px] text-gray">{cancelledCount}</span>
        </div>
      </div>
      <div className="py-2 px-3 rounded-lg min-h-20 flex items-center gap-3 bg-neutral/40 hover:shadow-xl duration-200">
        <div className="bg-gray-300/40 w-11 h-11 flex-center rounded-full">
          <FaAward size={23} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-primary">الأكثر طلباً</h3>
          <span className="text-[15px] text-gray">
            {topProducts.length ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
