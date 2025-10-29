import Table from "./Table";
import DashboardNavbar from "../DashboardNavbar";
import { useEnrichedProducts } from "@/hooks/useEnrichedOrders";
import { useState } from "react";
import { TablePagination } from "@/.";
import useOrders from "@/hooks/useOrders";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: orders = [], isLoading } = useEnrichedProducts(
    itemsPerPage,
    currentPage
  );
  const { data: getAllOrders = [] } = useOrders();
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">الطبات</h2>
        <Table orders={orders} loading={isLoading} />
        <TablePagination
          totalItems={getAllOrders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default Orders;
