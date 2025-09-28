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
    <div className="overflow-x-auto">
      <table className="w-full bg-neutral rounded-xl border-soft-gray border p-5">
        <thead className="border-b border-light-gray">
          <tr className="">
            <th className="text-center py-3">أسم المنتج</th>
            <th className="text-center py-3">رقم الطلب</th>
            <th className="text-center py-3">التاريخ</th>
            <th className="text-center py-3">الكمية</th>
            <th className="text-center py-3">السعر</th>
            <th className="text-center py-3">حالة الطلب</th>
            <th className="text-center py-3">خيارات</th>
          </tr>
        </thead>
        <tbody className="">
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
    </div>
  );
};

export default React.memo(OrdersTable);
