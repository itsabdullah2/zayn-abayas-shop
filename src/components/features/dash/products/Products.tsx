// import React from "react";
import DashboardNavbar from "../DashboardNavbar";

const Products = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">المنتجات</h2>
        {/* <Table orders={orders} loading={isLoading} /> */}
        {/* <TablePagination
          totalItems={getAllOrders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        /> */}
      </section>
    </>
  );
};

export default Products;
