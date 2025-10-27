import Table from "./Table";
import DashboardNavbar from "../DashboardNavbar";
import { useEnrichedProducts } from "@/hooks/useEnrichedOrders";

const Orders = () => {
  const { data: orders = [], isLoading } = useEnrichedProducts();

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
