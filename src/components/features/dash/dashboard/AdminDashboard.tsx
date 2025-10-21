import DashboardAnalytics from "./DashboardAnalytics";
import DashboardNavbar from "../DashboardNavbar";
import DashboardUpperBoxes from "./DashboardUpperBoxes";
import TableAndHighestProducts from "./TableAndHighestProducts";

const AdminDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">لوحة تحكم المسؤول</h2>
        <div className="flex flex-col gap-8 mt-10">
          <DashboardUpperBoxes />
          <DashboardAnalytics />
          <TableAndHighestProducts />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
