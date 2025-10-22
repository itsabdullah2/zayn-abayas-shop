import { useEffect, useState } from "react";
import Table from "./Table";
import type { FullOrder } from "@/supabase/types";
import { getAllOrders } from "@/supabase/db/orders";
import DashboardNavbar from "../DashboardNavbar";

const Orders = () => {
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersRes = await getAllOrders();
        setOrders(ordersRes);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">الطبات</h2>
        <Table orders={orders} loading={loading} />
      </section>
    </>
  );
};

export default Orders;
