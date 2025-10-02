import { getUserById } from "@/supabase/db/users";
import type { FullOrder, UserTableType } from "@/supabase/types";
import { formateDate } from "@/utils/formateDate";
import React, { useEffect, useState } from "react";

type Props = {
  orders: FullOrder[];
  loading: boolean;
};

const Table = ({ orders, loading }: Props) => {
  const [users, setUsers] = useState<UserTableType[]>([]);

  useEffect(() => {
    const fetchUsersById = async () => {
      try {
        const ids = orders.map((order) => order.user_id);
        const res = await getUserById(ids);
        setUsers(res);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (orders.length) fetchUsersById();
  }, [orders]);

  console.log(users);
  return (
    <div className="overflow-x-auto mt-10">
      {loading ? (
        <div className="text-center text-2xl font-medium text-primary">
          Loading...
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center p-3">رقم الطلب</th>
              <th className="text-center p-3">العميل</th>
              <th className="text-center p-3">المجموع</th>
              <th className="text-center p-3">الحالة</th>
              <th className="text-center p-3">تاريخ الطلب</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const user = users.find((u) => u.id === order.user_id);
              return (
                <tr key={order.id} className="odd:bg-gray-300">
                  <td className="text-center p-2 rounded-tr-md rounded-br-md">
                    {order.order_number}
                  </td>
                  <td className="text-center p-2 first-letter:capitalize">
                    {user?.username ?? "مستخدم غير معروف"}
                  </td>
                  <td className="text-center p-2">{order.total_price} E.L</td>
                  <td className="text-center p-2">{order.status}</td>
                  <td className="text-center p-2 rounded-tl-md rounded-bl-md">
                    {formateDate(order.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default React.memo(Table);
