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
    <section className="bg-neutral rounded-xl border-soft-gray border p-5">
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-light-gray">
            <tr>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[120px]">
                أسم المنتج
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[100px]">
                رقم الطلب
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[90px]">
                التاريخ
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[70px]">
                الكمية
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[100px]">
                السعر
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[120px]">
                حالة الطلب
              </th>
              <th className="text-center py-3 px-2 whitespace-nowrap min-w-[80px]">
                خيارات
              </th>
            </tr>
          </thead>
          <tbody>
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
    </section>
  );
};

export default React.memo(OrdersTable);
