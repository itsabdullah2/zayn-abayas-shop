// import React from "react";
import DashboardNavbar from "../DashboardNavbar";
import ProductsList from "./ProductsList";

const Products = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">المنتجات</h2>
        <ProductsList />
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
