import Dropdown from "@/components/layout/Dropdown";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/supabase";
import { getUserById } from "@/supabase/db/users";
import type { FullOrder, UserTableType } from "@/supabase/types";
import { formateDate } from "@/utils/formateDate";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  orders: FullOrder[];
  loading: boolean;
};

const Table = ({ orders, loading }: Props) => {
  const [users, setUsers] = useState<UserTableType[]>([]);
  const [localOrders, setLocalOrders] = useState<FullOrder[]>(orders);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

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

  const handleStatusChange = async (newStatus: string, orderId: string) => {
    // Optimistic UI Update
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    try {
      const userId = localOrders.find((order) => order.id === orderId)?.user_id;
      if (userId) {
        // Update the order status in the database
        await updateOrderStatus(newStatus, orderId, userId);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      // Revert the optimistic update in case of an error
      setLocalOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: orders.find((origin) => origin.id === orderId)!.status,
              }
            : order
        )
      );
      throw err;
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Orders Report", 10, 10);

    const tableColumns = [
      "Order Number",
      "Client Name",
      "Total",
      "Status",
      "Order Date",
    ];
    const tableRows: (string | number)[][] = [];

    localOrders.forEach((order) => {
      const user = users.find((u) => u.id === order.user_id);

      tableRows.push([
        order.order_number,
        user?.username ?? "مستخدم غير معروف",
        `${order.total_price} E.L`,
        order.status,
        formateDate(order.created_at),
      ]);
    });

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    doc.save("orders_report.pdf");
  };

  return (
    <div className="flex flex-col gap-2 mt-8">
      <Button
        className="w-fit px-10 bg-transparent border border-primary text-primary hover:bg-primary hover:text-neutral cursor-pointer"
        onClick={handleDownloadPDF}
      >
        طباعة
      </Button>
      <div className="overflow-x-auto">
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
              {localOrders.map((order) => {
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
                    {/* <td className="text-center p-2">{order.status}</td> */}
                    <td className="text-center p-2">
                      <Dropdown
                        status={order.status}
                        handleStatusChange={handleStatusChange}
                        orderId={order.id}
                      />
                    </td>
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
    </div>
  );
};

export default React.memo(Table);
