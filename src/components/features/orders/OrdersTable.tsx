import React from "react";
import type { FullOrder } from "@/supabase/types";
import TableRow from "./TableRow";

const OrdersTable = ({ orders }: { orders: FullOrder[] }) => {
  return (
    <table className="w-full">
      <thead className="flex py-3">
        <th className="flex-1 self-end text-center">أسم المنتج</th>
        <th className="flex-1 self-end text-center">رقم المعرف</th>
        <th className="flex-1 self-end text-center">التاريخ</th>
        <th className="flex-1 self-end text-center">الكمية</th>
        <th className="flex-1 self-end text-center">السعر</th>
        <th className="flex-1 self-end text-center">حالة الطلب</th>
      </thead>
      <tbody className="flex">
        {orders.map((order) => (
          <TableRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(OrdersTable);
