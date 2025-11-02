import { AuthContext } from "@/context/AuthContext";
import { getUserOrders, supabase } from "@/supabase";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import OrdersTable from "./OrdersTable";
import { TablePagination } from "@/.";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  const { data: ordersData = [], isLoading } = useQuery({
    queryKey: ["orders-data", user?.id, currentPage],
    queryFn: () => {
      const offset = (currentPage - 1) * itemsPerPage;
      return getUserOrders(user!.id, itemsPerPage, offset);
    },
    staleTime: 3 * 1000 * 60,
  });

  // Fetch total count separately
  const { data: totalCount = 0 } = useQuery({
    queryKey: ["orders-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count || 0;
    },
    staleTime: 3 * 1000 * 60,
  });

  let content;

  if (ordersData.length === 0) {
    content = (
      <div className="text-center flex-center">
        <p className="text-text text-xl">لا يوجد طلبات</p>
      </div>
    );
  }

  if (isLoading) {
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
          totalItems={totalCount}
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
