import React, { useState } from "react";
import type { FullOrder } from "@/supabase/types";
import TableRow from "./TableRow";
import ConfirmCancelDialog from "./ConfirmCancelDialog";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import { IoWarningOutline, IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "sonner";
import { cancelOrder } from "@/supabase";
import { AuthContext } from "@/context/AuthContext";

const OrdersTable = ({ orders }: { orders: FullOrder[] }) => {
  const [dropdownActions, setDropdownActions] = useState<string | null>(null);
  const [targetOrderId, setTargetOrderId] = useState<string>("");
  const { isDialogOpen, setIsDialogOpen } = useContextSelector(
    AppContext,
    (ctx) => ({
      isDialogOpen: ctx?.isDialogOpen,
      setIsDialogOpen: ctx?.setIsDialogOpen,
    })
  );
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  const handleDropdownActions = (id: string) => {
    setDropdownActions((prev) => (prev === id ? null : id));
    setTargetOrderId(id);
  };

  const handleConfirmCancellation = async () => {
    try {
      // Check if the status of the order is not processing or shipped
      const targetOrder = orders.find((order) => order.id === targetOrderId);
      if (
        targetOrder?.status === "processing" ||
        targetOrder?.status === "shipped"
      ) {
        toast.error("لا يمكن إلغاء الطلب لأنه قيد المعالجة أو تم شحنه.", {
          className: "bg-white! text-black!",
        });
        setIsDialogOpen?.(false);
        return;
      }
      if (user) {
        await cancelOrder(targetOrderId, user?.id);
      }
      setIsDialogOpen?.(false);
      toast.success("تم إلغاء الطلب بنجاح", {
        className: "bg-white! text-black!",
        icon: <IoCheckmarkCircle className="text-green-500" size={20} />,
      });
    } catch (error) {
      toast.error("!حدث خطأ أثناء إلغاء الطلب. حاول مرة أخرى.", {
        className: "bg-white! text-black!",
      });
      throw error;
    }
  };

  return (
    <>
      {isDialogOpen && (
        <ConfirmCancelDialog
          message="هل أنت متأكد من إلغاء الطلب؟"
          icon={<IoWarningOutline size={35} className="text-red-500" />}
          onClick={handleConfirmCancellation}
        />
      )}
      <section className="bg-neutral rounded-xl border-soft-gray border p-5 relative">
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[800px]">
            <thead>
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
                  setDropdownActions={setDropdownActions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default React.memo(OrdersTable);
