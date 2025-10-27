import Table from "./Table";
import DashboardNavbar from "../DashboardNavbar";
import { useEnrichedProducts } from "@/hooks/useEnrichedOrders";

const Orders = () => {
  const { data: orders = [], isLoading } = useEnrichedProducts();
  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);
  //       const ordersRes = await getAllOrders();
  //       setOrders(ordersRes);
  //     } catch (err) {
  //       console.error("Failed to fetch orders:", err);
  //       throw err;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">الطبات</h2>
        <Table orders={orders} loading={isLoading} />
      </section>
    </>
  );
};

export default Orders;
