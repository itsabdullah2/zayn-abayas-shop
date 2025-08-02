import { AuthContext } from "@/context/AuthContext";
import { getUserOrders } from "@/supabase";
import type { FullOrder } from "@/supabase/types";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import OrdersTable from "./OrdersTable";

const Orders = () => {
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
    content = <OrdersTable orders={ordersData} />;
  }

  return <section className="section-container">{content}</section>;
};

export default Orders;
