import { AuthContext } from "@/context/AuthContext";
import { getUserOrders } from "@/supabase";
import type { FullOrder } from "@/supabase/types";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import OrdersTable from "./OrdersTable";
import { TablePagination } from "@/.";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [ordersData, setOrdersData] = useState<FullOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        if (user) {
          const result = await getUserOrders(user.id);
          setOrdersData(result);
        }
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  let content;

  if (ordersData.length === 0) {
    content = (
      <div className="text-center flex-center">
        <p className="text-text text-xl">لا يوجد طلبات</p>
      </div>
    );
  }

  if (loading) {
    content = (
      <div className="text-center">
        <p className="text-text text-xl">جاري تحميل الطلبات...</p>
      </div>
    );
  }

  if (ordersData.length > 0) {
    content = (
      <>
        <OrdersTable orders={ordersData} />
        <TablePagination
          totalItems={ordersData.length}
          className="pb-3"
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </>
    );
  }

  return <section className="section-container">{content}</section>;
};

export default Orders;
