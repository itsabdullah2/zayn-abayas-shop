import React from "react";
import type { FullOrder } from "@/supabase/types";

const TableRow = ({ order }: { order: FullOrder }) => {
  console.log(order);
  return (
    <tr className="flex">
      <td className="flex-1">الاسم</td>
      <td className="flex-1">المعرف</td>
      <td className="flex-1">التاريخ</td>
      <td className="flex-1">الكمية</td>
      <td className="flex-1">السعر</td>
      <td className="flex-1">الحالة</td>
    </tr>
  );
};

export default React.memo(TableRow);
