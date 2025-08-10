import React, { useState, useMemo } from "react";
import type { FullOrder } from "@/supabase/types";
import TableRow from "./TableRow";

const OrdersTable = ({ orders }: { orders: FullOrder[] }) => {
  const [dropdownActions, setDropdownActions] = useState<string | null>(null);

  const generateOrderNumber = useMemo(() => {
    const random = Math.floor(100000000 + Math.random() * 900000000); // 9-digits
    return `#${random}`;
  }, []);

  const handleDropdownActions = (id: string) => {
    setDropdownActions((prev) => (prev === id ? null : id));
  };

  return (
    <table className="w-full bg-neutral rounded-xl border-soft-gray border min-h-[450px] p-5 flex flex-col">
      <thead className="border-b border-light-gray">
        <tr className="flex py-3">
          <th className="flex-1 self-end text-center">أسم المنتج</th>
          <th className="flex-1 self-end text-center">رقم الطلب</th>
          <th className="flex-1 self-end text-center">التاريخ</th>
          <th className="flex-1 self-end text-center">الكمية</th>
          <th className="flex-1 self-end text-center">السعر</th>
          <th className="flex-1 self-end text-center">حالة الطلب</th>
          <th className="flex-1 self-end text-center">خيارات</th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {orders.map((order) => (
          <TableRow
            key={order.id}
            order={order}
            dropdownActions={dropdownActions}
            handleDropdownActions={handleDropdownActions}
            generateOrderNumber={generateOrderNumber}
            setDropdownActions={setDropdownActions}
          />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(OrdersTable);
