import { lazy } from "react";
import DashboardNavbar from "../DashboardNavbar";

const DashboardAnalytics = lazy(() => import("./DashboardAnalytics"));
const DashboardUpperBoxes = lazy(() => import("./DashboardUpperBoxes"));

const AdminDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="section-container">
        <h2 className="text-xl font-medium text-primary">لوحة تحكم المسؤول</h2>
        <div className="flex flex-col gap-8 mt-10">
          <DashboardUpperBoxes />
          <DashboardAnalytics />
          {/* <TableAndHighestProducts /> */}
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
