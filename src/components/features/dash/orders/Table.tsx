import Dropdown from "@/components/layout/Dropdown";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/supabase";
import { getUserById } from "@/supabase/db/users";
import type { FullOrder, UserTableType } from "@/supabase/types";
import { formateDate } from "@/utils/formateDate";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import AdminConfirmReturningPopup from "./AdminConfirmReturningPopup";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  orders: FullOrder[];
  loading: boolean;
};

const Table = ({ orders, loading }: Props) => {
  const [users, setUsers] = useState<UserTableType[]>([]);
  const [localOrders, setLocalOrders] = useState<FullOrder[]>(orders);
  const [returnInfoPopup, setReturnInfoPopup] = useState(false);
  const [isOrderId, setIsOrderId] = useState<{
    orderItemId: string;
    orderId: string;
  } | null>(null);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);

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

      toast.success("تم تحديث حالة الطلب بنجاح!");
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
      toast.error("حدث خطأ أثناء تحديث حالة الطلب. حاول مرة أخرى.");
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

    // Add Toast
    toast.success("تم تحميل تقرير الطلبات بنجاح!");
  };
  const openReturnInfoPopup = () => {
    setReturnInfoPopup(true);
  };

  const handleConfirmReturn = async () => {
    if (!isOrderId) return;

    const { orderId } = isOrderId;

    // Optimistic UI Update
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "returned" } : order
      )
    );

    try {
      if (profile) {
        await updateOrderStatus("returned", orderId, undefined, true);
        toast.success("تم تأكيد الإرجاع بنجاح!");
        setIsOrderId(null);
        setReturnInfoPopup(false);
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      // Revert on error
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
      toast.error("حدث خطأ أثناء تأكيد الإرجاع");
    }
  };
  const handleCancelReturn = () => {
    setReturnInfoPopup(false);
  };
  return (
    <>
      {returnInfoPopup && (
        <AdminConfirmReturningPopup
          onConfirm={handleConfirmReturn}
          onCancel={handleCancelReturn}
          orderItemId={isOrderId && isOrderId.orderItemId}
        />
      )}
      <div className="flex flex-col gap-2 mt-8 bg-neutral py-5 px-3 rounded-lg max-h-[calc(100vh-250px)]">
        <Button
          className="w-fit px-4 sm:px-10 bg-transparent border border-primary text-primary hover:bg-primary hover:text-neutral cursor-pointer"
          onClick={handleDownloadPDF}
        >
          طباعة
        </Button>
        <div className="overflow-x-auto flex-1">
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
                  <th className="text-center p-3">الكمية</th>
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
                      <td className="text-center p-2 first-letter:capitalize max-w-[160px] break-words">
                        {user?.username ?? "مستخدم غير معروف"}
                      </td>

                      <td className="text-center p-2">
                        {order.order_items[0]?.quantity}
                      </td>
                      <td className="text-center p-2">
                        {order.total_price} E.L
                      </td>
                      {/* <td className="text-center p-2">{order.status}</td> */}
                      <td className="text-center p-2 relative">
                        {order.status === "return" ? (
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              className="cursor-pointer bg-transparent border border-red-400 text-primary hover:bg-transparent animate-return-ripple"
                              onClick={() => {
                                openReturnInfoPopup();
                                setIsOrderId({
                                  orderItemId: order.order_items[0].id,
                                  orderId: order.id,
                                });
                              }}
                            >
                              العميل يريد استرجاع المنتج
                            </Button>
                          </div>
                        ) : (
                          <Dropdown
                            status={order.status}
                            handleStatusChange={handleStatusChange}
                            orderId={order.id}
                          />
                        )}
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
    </>
  );
};

export default React.memo(Table);
